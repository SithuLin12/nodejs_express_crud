import db from "./db";

export const index = (req,res) => {
    let sql = `select * from tags`
    db.query(sql,(e,data)=> {
        if(e) throw e;
        res.render('index',{data});
    })
   
}

export const create = (req,res) => {
    res.render('create')
}

const uuid = () => {
    return Math.floor(Math.random() * 1000000000)
}



export const store = (req,res) => {
  const {name} = req.body;
  const img = req.files.image;
  const img_path = `upload/${uuid()}${img.name}`;

  let sql = `insert into tags (name,image) values ('${name}','${img_path}')`;

  db.query(sql,e=> {
    if(e) throw e;
    img.mv(`./asset/${img_path}`,e=>{
        if(e) throw e;

        res.redirect('/')
    })
  })
}


export const edit = (req,res) => {
    const id = req.params.id;
    let sql = 'select * from tags where id='+id;
    db.query(sql,(e,data)=> {
        if(e) throw e;
       res.render('edit',{data : data[0]})
    })
   
}

export const upload = (req,res) => {
    const {id} = req.params;
    let sql = 'select * from tags where id='+id;
    db.query(sql,(err,data)=> {
        if(err) throw err;
        var dbData = data[0];
        var image;
        if(!req.files || Object.keys(req.files).length == 0){
            image = dbData.image
        }else{
            const img = req.files.image;
            image = "upload/"+ uuid() + img.name;

            img.mv('./asset/'+image,e=>{
                if(e) throw e;
            })
        }
        const {name} = req.body;
        const sql = `update tags set name='${name}',image='${image}' where id=${id}`

        db.query(sql,(e) =>{
            if(e) throw e;
            res.redirect('/');
        })
    })
}


export const destory = (req,res) => {
    const {id} = req.params;
    const sql = 'delete from tags where id='+id;
    db.query(sql,(err) => {
        if(err) throw err;

        res.redirect('/')
    })
}