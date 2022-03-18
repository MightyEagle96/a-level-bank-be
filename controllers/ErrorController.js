export const ErrorHandler = (error, res) => {
  if (error.code === 11000) {
    return res.status(409).json({ message: 'Duplicate data found' });
  } else {
    res.status(500).json({ message: 'Something terrible happened' });
  }
};
