const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



const adminauth = require('./routes/admin/adminauth')
const addvehicle = require('./routes/admin/addvehicle')
const vehiclelist = require('./routes/admin/vehiclelist')
const clientlist = require('./routes/admin/clientlist')
const adminbooking=require('./routes/admin/booking')
const managepage = require('./routes/admin/managepage')
const changeadminpassword=require('./routes/admin/changepassword')
const auth = require('./routes/client/loginregister')
const forgetpassword=require('./routes/client/forgetpassword')
const home = require('./routes/client/home')
const userprofile = require('./routes/client/userprofile')
const car=require('./routes/client/car')
const booking=require('./routes/client/carbooking')
const aboutus=require('./routes/client/aboutus')
const contact=require('./routes/client/contact')


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views/admin'),
    path.join(__dirname, 'views/client')
]);




mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log('Database connected succesfully')
}).catch(err => console.error(err))





app.use('/', auth)
app.use('/',forgetpassword)
app.use('/', home)
app.use('/', userprofile)
app.use('/',car)
app.use('/',booking)
app.use('/',aboutus)
app.use('/',contact)


app.use('/admin', adminauth)
app.use('/admin', addvehicle)
app.use('/admin', vehiclelist)
app.use('/admin', clientlist)
app.use('/admin', managepage)
app.use('/admin',adminbooking)
app.use('/admin',changeadminpassword)



// Global error handling middleware (add this AFTER all routes)
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    
    // Check if response was already sent
    if (res.headersSent) {
        return next(err);
    }
    
    // If it's an admin route, try to render admin error page
    if (req.originalUrl.startsWith('/admin')) {
        return res.status(500).render('addvehicles', {
            admin: null,
            msg: 'Server Error: ' + (err.message || 'Something went wrong')
        });
    }
    
    // Default error response
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});





app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})