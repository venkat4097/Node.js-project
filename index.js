const express=require('express')
const app=express();
const path=require('path')
const fs=require('fs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/',function(req,res){
    // res.send("running fine");
    fs.readdir(`./files`,function(err,files){
        // console.log(files);
        res.render("index",{files:files});
    })
    // res.render("index")
});

app.get('/delete/:filename', function(req, res) {
    fs.unlink(`./files/${req.params.filename}`, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect('/');
    });
});


app.post('/create',function(req,res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
           res.redirect('/')
    })
});

// app.get('/file/:filename',function(req,res){
//     fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,filedata){
//         res.render('show',{filename:req.params.filename,filedata:filedata})
//     })
// })
app.get('/file/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function(err, filedata) {
        res.render('show', {
            filename: req.params.filename,
            filedata: filedata
        });
    });
});

app.get('/edit/:filename', function(req, res) {
    res.render('edit',{filename:req.params.filename});
});

app.post('/edit',function(req,res){
    // console.log(req.body);
    fs.rename(`./files/${req.body.prevname}`,`./files/${req.body.newname}`,function(err){
        res.redirect('/');
    });
})

// app.get('/jagan',function(req,res){
//     res.send("this is jagan");
// })
// app.get('/jagan/venkat',function(req,res){
//     res.send("this is jagan venkat")
// })
app.listen(3000,function(){
    console.log("running port ");
})