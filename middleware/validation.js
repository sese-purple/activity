export const validateTodo = (req, res, next) => {    

   const { text } = req.body;

if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ 
        error: 'Todo text is required and must be a non-empty string' 
    });
  }
if (text.length > 200) {

    return res.status(400).json({
        error: 'Todo text must be less than 200 characters'
    });
  }

req.body.text = text.trim();
next();

};