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
  values.push([jsondata.type,jsondata.blockId,jsondata.ids,jsondata.time,jsondata.pycode]);
  console.log(values);
  console.log(jsondata.time);
  connection.query('INSERT INTO createblocks (type, blockId , ids, time,code) VALUES ?', [values], function(err) {
    if(err) {
       res.send('Error');
    }
   else {
       res.send('Success');
    }
  });
}
if (jsondata.type=='delete')
{
  console.log(values);
  console.log(jsondata.ids.length);
  if(jsondata.ids.length==1)
  {
    values.push([jsondata.type,jsondata.blockId,jsondata.ids,jsondata.time,jsondata.pycode]);
    console.log(jsondata.type);
    console.log(jsondata.ids);
    console.log('if condition');
    connection.query('INSERT INTO deleteblocks (type, blockId , ids, time,code) VALUES ?', [values], function(err) {
      if(err) {
         res.send('Error');
      }
      else {
         res.send('Success');
      }
    });

  }
  else
  {
    var myArrString = JSON.stringify(jsondata.ids);
    jsondata.type='delete_group_of_blocks';
    values.push([jsondata.type,jsondata.blockId,myArrString,jsondata.time,jsondata.pycode]);
    console.log(jsondata.type);
    console.log(myArrString);
    console.log('else condition');
    connection.query('INSERT INTO deleteblocks (type, blockId , ids, time,code) VALUES ?', [values], function(err) {
      if(err) {
           res.send('Error');
      }
      else {
           res.send('Success');
      }
    });
  }
}

if (jsondata.type=='change')
{
  values.push([jsondata.type,jsondata.blockId,jsondata.element,jsondata.name,jsondata.newValue,jsondata.time,jsondata.pycode]);
  console.log(values);
  console.log(jsondata.time);
  
  connection.query('INSERT INTO changeblocks (type, blockId , element, name, newvalue, time,code) VALUES ?', [values], function(err) {
    if(err) {
       res.send('Error');
    }
   else {
       res.send('Success');
    }
  });
}

if (jsondata.type=='move')
{ 
  if(jsondata.newParentId !== undefined)
  {
    jsondata.type='combine'; 
    //var myArrString = JSON.stringify(jsondata.ids); 
    values.push([jsondata.type,jsondata.blockId,jsondata.newParentId,jsondata.newInputName,jsondata.time,jsondata.pycode]); 
    console.log(values); 
    console.log(jsondata.time); 
    console.log(jsondata.newParentId); 
    console.log(jsondata.type); 
    connection.query('INSERT INTO combineblocks (type, blockId , parentids,inputname, time,code) VALUES ?', [values], function(err) { 
      if(err) { 
        res.send('Error'); 
      } 
      else { 
        res.send('Success'); 
      } 
    });
  }
  else
  {
    connection.query('SELECT blockId FROM combineblocks WHERE blockId ='+ mysql.escape(jsondata.blockId), function(err,result,fields){ 
      if (err) throw err;
      console.log(result);
      var data = result;
      console.log(data);
      console.log('true');
    });
    if(data !== null)
    {
      jsondata.type='split block';
      console.log('not null');
    }
    values.push([jsondata.type,jsondata.blockId,jsondata.newCoordinate,jsondata.time,jsondata.pycode]);
    console.log(jsondata.values);
    connection.query('INSERT INTO moveblocks (type, blockId , newcoordinate, time,code) VALUES ?', [values], function(err) {
    if(err) {
      res.send('Error');
    }
    else {
      res.send('Success');
    }
    });
  }
}
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
