import diaryModel from '../models/diaryModel.js';

const createEntry = async (req, res) => {
  const user_id = req.user.id;
  const {entry_date, mood, sleep_hours, weight, notes} = req.body;

  if (!entry_date || !mood) {
    return res.status(400).json({error: 'Date and mood are required'});
  }

  const newEntry = {user_id, entry_date, mood, weight, sleep_hours, notes};
  const result = await diaryModel.createEntry(newEntry);

  if (result.error) {
    return res.status(500).json({error: result.error});
  }

  res
    .status(201)
    .json({message: 'Diary entry created', entryId: result.entry_id});
};

const deleteEntry = async (req, res) => {
  console.log("--- DELETE REQUEST RECEIVED ---");
  console.log("Params ID:", req.params.id);
  console.log("User from Token:", req.user);

  const user_id = req.user.id;
  const entry_id = req.params.id;

  console.log(user_id, entry_id)

  if (!entry_id || !user_id) {
    return res.status(400).json({error: 'Entry ID and User ID are required'});
  }
  try {
    const result = await diaryModel.deleteEntryById(entry_id, user_id);

    if (result.error) {
      return res.status(404).json({error: result.error});
    }

    return res.status(200).json({message: 'Entry deleted successfully'});
  } catch (err) {
    console.error('Controller Error', err);
    return res.status(500).json({error: 'Internal server error'});
  }
};

const getUserEntries = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await diaryModel.getEntriesByUserId(userId);

    if (result.error) {
      return res.status(404).json({error: result.error})
    }

    res.json(result);
  } catch (err) {
    console.error('Controller Error', err)
    res.status(500).json({error: 'Failed to fetch entries'});
  }
};

export {createEntry, deleteEntry, getUserEntries};
