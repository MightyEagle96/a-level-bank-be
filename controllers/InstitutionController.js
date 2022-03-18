import InstitutionModel from '../models/InstitutionModel.js';
import { ErrorHandler } from './ErrorController.js';

export const CreateInstitution = async (req, res) => {
  try {
    await InstitutionModel.create(req.body);

    res
      .status(201)
      .json({ title: 'Success', message: 'Institution Created successfully' });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const ViewInstitutions = async (req, res) => {
  const institutions = await InstitutionModel.find(req.query);
  res.json({ institutions });
};

export const DeleteInstitution = async (req, res) => {
  await InstitutionModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Insitution Deleted', title: 'Success' });
};
