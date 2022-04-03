import ScratchCardModel from '../models/ScratchCardModel.js';
import CandidateModel from '../models/CandidateModel.js';
import { randomUUID } from 'crypto';
import { ErrorHandler } from './ErrorController.js';
import VerificationModel from '../models/VerificationModel.js';

export const CreateScratchCards = async (req, res) => {
  for (let i = 0; i < req.body.amount; i++) {
    const splitString = randomUUID().split('-');
    const pin = `${splitString[1]}${splitString[2]}${splitString[3]}`;
    await ScratchCardModel.create({ pin });
  }
  res.json({
    title: 'Success',
    message: "A' Level Bank pins created successfully",
  });
};

export const UseScratchCard = async (req, res) => {
  if (!req.body.pin || !req.body.regNumber)
    return res
      .status(400)
      .json({ title: 'Error', message: 'Please input pin or reg number' });
  req.body.pin = req.body.pin.toLowerCase();
  try {
    const { pin, regNumber } = req.body;

    const scratchCard = await ScratchCardModel.findOne({ pin });
    if (!scratchCard) {
      //update the failed verification count and also state the reason.
      const data = {
        status: 'failed',
        loggedAt: new Date(),
        reason: 'Invalid scratch card',
      };

      await VerificationModel.create(data);
      return res.status(400).json({
        title: 'PIN Invalid',
        message: 'The pin you entered is invalid',
      });
    }

    const candidate = await CandidateModel.findOne({ regNumber }).populate([
      'examinationBody',
      'institution',
      'subject1.subject',
      'subject2.subject',
      'subject3.subject',
    ]);

    if (!candidate) {
      const data = {
        status: 'failed',
        loggedAt: new Date(),
        reason: 'Candidate not found',
      };

      await VerificationModel.create(data);
      return res.status(400).json({
        title: 'Candidate Not found',
        message:
          'The registration number you entered is incorrect or does not exist',
      });
    }

    if (scratchCard.usedBy) {
      //check if it is still used by the same person or not
      if (scratchCard.usedBy.toString() === candidate._id.toString()) {
        if (scratchCard.limit > 5) {
          const data = {
            status: 'failed',
            loggedAt: new Date(),
            reason: 'Scratch card limit reached',
            verifiedBy: candidate._id,
            scratchCard: scratchCard._id,
          };

          await VerificationModel.create(data);
          return res.status(400).json({
            title: 'Error',
            message: 'You have used this scratchcard up to 5 times',
          });
        } else {
          const data = {
            status: 'failed',
            loggedAt: new Date(),
            reason: 'Scratch card used by another candidate',
            verifiedBy: candidate._id,
            scratchCard: scratchCard._id,
          };

          await VerificationModel.create(data);
          await ScratchCardModel.findByIdAndUpdate(scratchCard._id, {
            limit: (scratchCard.limit += 1),
          });

          return res.json({ candidate });
        }
      } else {
        const data = {
          status: 'failed',
          loggedAt: new Date(),
          reason: 'Scratch card used by another candidate',
          verifiedBy: candidate._id,
          scratchCard: scratchCard._id,
        };

        await VerificationModel.create(data);
        return res.status(400).json({
          title: 'Error',
          message: 'Scratch card already used by another candidate',
        });
      }
    } else {
      const data = {
        status: 'success',
        loggedAt: new Date(),
        verifiedBy: candidate._id,
        scratchCard: scratchCard._id,
      };

      await VerificationModel.create(data);
      //first time user
      await ScratchCardModel.findByIdAndUpdate(scratchCard._id, {
        limit: (scratchCard.limit += 1),
        usedBy: candidate._id,
      });
      res.json({ candidate });
    }
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const ViewScratchCards = async (req, res) => {
  if (req.query.usedBy === 'notNull') {
    req.query = { usedBy: { $ne: null } };
  } else if (req.query.usedBy === 'null') {
    req.query = { usedBy: null };
  }
  try {
    const scratchCards = await ScratchCardModel.find(req.query).populate(
      'usedBy'
    );
    res.json({ length: scratchCards.length, scratchCards });
  } catch (error) {
    ErrorHandler(error, res);
  }
};
