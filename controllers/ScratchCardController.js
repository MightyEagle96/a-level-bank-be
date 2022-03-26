import ScratchCardModel from '../models/ScratchCardModel.js';
import CandidateModel from '../models/CandidateModel.js';
import { randomUUID } from 'crypto';
import { ErrorHandler } from './ErrorController.js';

export const CreateScratchCards = async (req, res) => {
  for (let i = 0; i < 50; i++) {
    const splitString = randomUUID().split('-');
    const pin = `${splitString[1]}-${splitString[2]}-${splitString[3]}`;
    ScratchCardModel.create({ pin });
  }
  res.json({
    title: 'Success',
    message: "A' Level Bank pins created successfully",
  });
};

export const UseScratchCard = async (req, res) => {
  try {
    const { pin, regNumber } = req.body;

    const scratchCard = await ScratchCardModel.findOne({ pin });
    if (!scratchCard) {
      return res.status(400).json({
        title: 'PIN Invalid',
        message: 'The pin you entered is invalid',
      });
    }

    const candidate = await CandidateModel.findOne({ regNumber });

    if (!candidate) {
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
          return res.status(400).json({
            title: 'Error',
            message: 'You have used this scratchcard up to 5 times',
          });
        } else {
          await ScratchCardModel.findByIdAndUpdate(scratchCard._id, {
            limit: (scratchCard.limit += 1),
          });

          return res.json({ candidate });
        }
      } else
        return res.status(400).json({
          title: 'Error',
          message: 'Scratch card already used by another candidate',
        });
    } else {
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