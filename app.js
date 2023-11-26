import express from 'express'
import router from './router';
import engine  from 'express-edge';
import fileUpload from 'express-fileupload';

const app = express();
// file
app.use(express.static('asset'))
// template
app.use(engine);
app.set('views', `${__dirname}/page`);
// file upload
app.use(fileUpload())
// body paraser
app.use(express.urlencoded({ extended:true }));

// router
app.use(router)

app.listen(3333,() => {
    console.log('server running is prot 30000');
});