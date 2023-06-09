// Modules and variables
//require('dotenv').config()
const express = require('express'),
	nodemailer = require('nodemailer'),
	requests = require('request'),
	multer = require('multer'),
	fs = require('fs'),
	util = require('util'),
	unlinkFile = util.promisify(fs.unlink)
upload = multer({ dest: __dirname + '/data/' }),

	//bodyParser = require('body-parser'),
	//{ AsyncParser } = require('json2csv'),
	createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { CloudFormation } = require('aws-sdk');
const { uploadFile } = require('./s3');
var papa = require('papaparse');


//const bucketName = process.env.AWS_BUCKET_NAME

var data_dict = {};


// --- INSTANTIATE THE APP
app = express();
// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname + '/public'));
app.use('/jspsych', express.static(__dirname + "/jspsych"));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: false }));

// console.log(__dirname);

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// --- ROUTING
app.get('/', function (request, response) {
	// console.log("Started");
	response.render('index.html');
});


app.get('/experiment', function (request, response) {
	response.render('Stroop_colorword.html');
});

app.post('/save_data', upload.single('data'), async (request, response) => {
	data_dict['stroop_acc'] = request.body.stroop_score;
	data_dict['cpt_acc'] = request.body.cpt_score;
	data_dict['tmt_acc'] = request.body.tmt_score;
	console.log(data_dict);

	const csvWriter = createCsvWriter({
		path: 'data/' + request.body.subject_id + '.csv',
		header: [
			{ id: 'success', title: 'success' },
			{ id: 'trial_type', title: 'trial_type' },
			{ id: 'trial_index', title: 'trial_index' },
			{ id: 'time_elapsed', title: 'time_elapsed' },
			{ id: 'internal_node_id', title: 'internal_node_id' },
			{ id: 'subject', title: 'subject' },
			{ id: 'rt', title: 'rt' },
			{ id: 'stimulus', title: 'stimulus' },
			{ id: 'response', title: 'response' },
			{ id: 'load_time', title: 'load_time' },
			{ id: 'raw_gaze', title: 'raw_gaze' },
			{ id: 'percent_in_roi', title: 'percent_in_roi' },
			{ id: 'average_offset', title: 'average_offset' },
			{ id: 'validation_points', title: 'validation_points' },
			{ id: 'samples_per_sec', title: 'samples_per_sec' },
			{ id: 'view_history', title: 'view_history' },
			{ id: 'type', title: 'type' },
			{ id: 'Congruency', title: 'Congruency' },
			{ id: 'letter', title: 'letter' },
			{ id: 'webgazer_data', title: 'webgazer_data' },
			{ id: 'webgazer_targets', title: 'webgazer_targets' },
			{ id: 'correct', title: 'correct' }
		]
	});

	const data = JSON.parse(request.body.data);
	const idArray = [
		'success',
		'trial_type',
		'trial_index',
		'time_elapsed',
		'internal_node_id',
		'subject',
		'rt',
		'stimulus',
		'response',
		'load_time',
		'raw_gaze',
		'percent_in_roi',
		'average_offset',
		'validation_points',
		'samples_per_sec',
		'view_history',
		'type',
		'Congruency',
		'letter',
		'webgazer_data',
		'webgazer_targets',
		'correct'
	];

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < idArray.length; j++) {
			if (data[i].hasOwnProperty(idArray[j])) {
				// If it contains nested objects then stringify it
				if (typeof data[i][idArray[j]] === 'object') {
					data[i][idArray[j]] = JSON.stringify(data[i][idArray[j]]);
				}
			}
		}
	}

	csvWriter.writeRecords(data)
		.then(() => {
			console.log('Sending Data');
		});

	const path = 'data/' + request.body.subject_id + '.csv';
	const result = await uploadFile(data, path, request.body.subject_id + 'data.csv');
	await unlinkFile(path);
	console.log(result);
	const description = request.body.description;
	response.status(201).send({ success: true });
});

app.post('/video_data', upload.single('file'), async (req, res) => {
	// console.log(req.file.path);
	// // console.log("CHECK1");
	// const result = await uploadFile(req.file,req.file.path,req.file.filename)
	// await unlinkFile(req.file.path)

	// save the file to the local file system
	// generate a random name for the file
	// console.log(req.body.fname);
	const fileName = Math.random().toString(36).substring(7);
	// console.log(fileName);
	filename = req.body.fname + '.mp4';
	const result = await uploadFile(req.file, req.file.path, filename)

	// console.log("CHECK2");
	// console.log(result)
	const description = req.body.description
	res.status(200).send({ success: true });
});

app.post('/email', function (request, response) {
	const { email, name, message } = request.body;
	const mcData = {
		members: [
			{
				email_address: email,
				status: "pending",
				merge_fields: {
					FNAME: name,
					FEEDBACK: message
				}
			}
		]
	}
	const mcDataPost = JSON.stringify(mcData);
	const options = {
		url: "https://<DC>.api.mailchimp.com/3.0/lists/<ID>",
		method: "POST",
		headers: {
			Authorization: "auth AUTH-KEY"
		},
		body: mcDataPost
	}
	if (email) {
		//success
		requests(options, (err, responses, body) => {
			if (err) {
				// console.log(err);
				response.json({ error: err })
			} else {
				response.status(200).send({ message: "success" });
			}
		})
	}
	else {
		response.status(404).send({ message: "Failed" });
	}
});

app.get('/report', function (request, response) {
	response.render('report_updated.html', { stroop_score: data_dict['stroop_acc'], cpt_score: data_dict['cpt_acc'], tmt_score: data_dict['tmt_acc'] })
});




const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/engageme.hmi.iiitd.edu.in/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/engageme.hmi.iiitd.edu.in/fullchain.pem'),
}


// --- START THE SERVER 
// var server = app.listen(process.env.PORT || 3000, function () {
// 	// console.log("Listening on port %d", server.address().port);
// });

// use the following for https server
var server = require('https').createServer(options, app).listen(3000, function () {
	// console.log("Listening on port id %d", server.address().port);
}
);
