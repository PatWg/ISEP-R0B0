var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var index = require('./routes/index');

var app = express();
// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sampledb'
  });

//Establish MySQL connection
connection.connect(function(err) {
   if (!err) {
    console.log('Connected to MySQL');
    // Start the app when connection is ready
    console.log('Server listening on port 3000');
    
   }
   else {
    
   console.log('Not Connected to MySQL');
   // Start the app when connection is ready
   
   console.log('Server not listening on port 3000');   
 }
});

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/'));
});

app.post('/', function(req, res) {
var jsondata = req.body;
var values = [];
  
//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
if (jsondata.type=='create')
{
  var len=jsondata.ids.length;
  console.log(len);
  var myArrString = JSON.stringify(jsondata.ids);
  var bid=[];
  bid=jsondata.ids;
  var blocktype=['main','first','second','third'];
  for(i=0;i<len;i++)
  {
    values.push([jsondata.type,jsondata.blockId,jsondata.block,blocktype[i],bid[i],myArrString,jsondata.time,jsondata.pycode]);
    console.log(values);
  }
  connection.query('INSERT INTO createblocks (type, blockId , block,blocktype,bid,ids, time,code) VALUES ?', [values], function(err,res) {
    if (err) throw err;
    console.log('created and value inserted');
  });
}
if (jsondata.type=='delete')
{
  var block = 'block';
  var blocktype = 'blocktype';
  
  console.log(jsondata.ids.length);
  console.log(jsondata.ids);
  id=jsondata.ids;
  var i;
  for (i = 0; i < id.length; i++) { 
    values.push([jsondata.type,jsondata.blockId,block,blocktype,jsondata.ids[i],jsondata.time,jsondata.pycode]);
    console.log(values);
  }
  connection.query('INSERT INTO deleteblocks (type, blockId,block,blocktype , ids, time,code) VALUES ?', [values], function(err) {
      if (err) throw err;
    });  
  connection.query('UPDATE deleteblocks, createblocks SET deleteblocks.block = createblocks.block,deleteblocks.blocktype = createblocks.blocktype  WHERE deleteblocks.ids = createblocks.bid', function(err) {
    if (err) throw err;
  });
}

if (jsondata.type=='change')
{
  var block = 'block';
  var blocktype = 'blocktype';
  console.log(jsondata.name);
  if (jsondata.name == undefined)
  {
    jsondata.name='none';
  }
  values.push([jsondata.type,jsondata.blockId,block,blocktype,jsondata.element,jsondata.name,jsondata.newValue,jsondata.time,jsondata.pycode]);
  console.log(values);
  console.log(jsondata.time);
  
  connection.query('INSERT INTO changeblocks (type, blockId , block,blocktype,element, name, newvalue, time,code) VALUES ?', [values], function(err) {
    if (err) throw err;
  });
  connection.query('UPDATE changeblocks, createblocks SET changeblocks.block = createblocks.block,changeblocks.blocktype = createblocks.blocktype  WHERE changeblocks.blockId = createblocks.bid', function(err) {
    if (err) throw err;
  });
}

if (jsondata.type=='move')
{ 
  
  if(jsondata.newParentId != null && jsondata.newParentId != undefined)
  {
    console.log('loop entered');
    jsondata.type='combine'; 
    var block='block';
    var blocktype='blocktype';
    var combineblock='combineblock';
    
    var pblocktype='pblocktype';
    var pblock='pblock';
    console.log(jsondata.newInputName);
    if (jsondata.newInputName == undefined)
    {
      jsondata.newInputName='none';
    }
    connection.query('call combine(?,?,?,?,?,?,?,?,?,?,?)',[jsondata.type,jsondata.blockId,block,blocktype,jsondata.newParentId,pblock,pblocktype,jsondata.newInputName,jsondata.time,jsondata.pycode,combineblock], function(err) { 
      if (err) throw err; 
      console.log('Data in procedure combined\n');
    });
  }
  else
  {
    var id = jsondata.blockId;
    jsondata.type='move block';
    var blocktype = 'blocktype';
    console.log('data entered');
    console.log(jsondata.pycode);
    connection.query('call blockid(?,?,?,?,?,?)',[jsondata.type,jsondata.blockId,blocktype,jsondata.newCoordinate,jsondata.time,jsondata.pycode], function(err) { 
      if (err) throw err; 
      console.log('Data in procedure split and move\n');
    });
  }
}
res.end('end');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
