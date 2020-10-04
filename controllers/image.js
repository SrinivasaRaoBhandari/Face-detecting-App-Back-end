const Clarifai = require ('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '063397f8c8da4b8aa48073fc5b932bb1'
});

const handleApiCall = (req,res) => {
	app.models
		.predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable work with API'))
}


const handleImage = (req,res, db) =>{
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
      res.json(entries[0]);
    })
    .catch(err=> res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage:handleImage,
	handleApiCall:handleApiCall
}