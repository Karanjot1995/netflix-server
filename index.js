
var express = require('express')
var app = express()
const path = require('path');
const util = require('util');
const cors = require("cors");
const mysql = require('mysql');
// const { Client } = require("pg");
const PORT = process.env.PORT || 8000;
var router = express.Router();
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", require("./routes"));


// const client = new Client("postgresql://karanjot:b3Sm8xqUfND1FlJtN43oHA@maxed-newt-10787.5xj.cockroachlabs.cloud:26257/netflix?sslmode=verify-full");

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("CREATE TABLE User (id int(11) NOT NULL AUTO_INCREMENT, email varchar(100) NOT NULL, password varchar(100) NOT NULL, f_name varchar(100) NOT NULL, l_name varchar(100) NOT NULL, phone varchar(100) NOT NULL, dob datetime DEFAULT NULL, `card_number` int(20) DEFAULT NULL, `cvv` int(20) DEFAULT NULL, `expiry` int(11) DEFAULT NULL, PRIMARY KEY (id));");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();
// let config = {
//     host     : 'netflix-vms.cjnhrlike9ax.us-east-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'karan1195',
//     port     : '3306',
//     database:'VMS'
// };

// let config = {
//     host     : 'remotemysql.com',
//     user     : '6Yp3q3zcNd',
//     password : 'enc1taaYIV',
//     database:'6Yp3q3zcNd',
//     port:'3306'
// };



// let conn = mysql.createConnection(config);
// let connectionsAv = conn.query(`SET GLOBAL max_user_connections = 300;`)



// let config = {
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : '',
//     database:'netflix_db',
//     port:'3300'
// };

let config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9627718',
    password : 'KxEK7BerUa',
    database : 'sql9627718',
    port:'3306'
};

let connection;



// const connection = mysql.createPool({
//     host     : 'remotemysql.com',
//     user     : '6Yp3q3zcNd',
//     password : 'enc1taaYIV',
//     database:'6Yp3q3zcNd',
//     port:'3306'
// });

// connection.query(
//   "Select * from F21_S001_16_Customer",
//   (err, result) => {
//     err ? console.log(err) : console.log(result);
//   }
// );





// var connection = mysql.createConnection({
//     host     : 'netflix-vms.cjnhrlike9ax.us-east-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'karan1195',
//     port     : '3306',
//     database : 'VMS',
// });
// var query = connection.query(  "DELETE FROM F21_S001_16_Customer where DOB = '0000-00-00'", function(err, result) {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// });


// function conn (){
//     let connection = mysql.createConnection(config);
//     connection.connect();
//     let query = util.promisify(connection.query).bind(connection);
// }
// function connEnd(){
//     connection.end();                
//     connection = null;
//     query = null;
// }



app.get('/api/all-content', async (req, res) => {
    let data = {content:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        console.log(connection)
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let result = await query(
            `select * from Content`
        )

        // console.log(res)

        // let result = await query(
        //     `select C.ContentID, C.name, C.image_data, C.average_rating,  CG.Genre
        //     from Content C JOIN (
        //         select ContentId, GROUP_CONCAT(Genre) as Genre
        //         from F21_S001_16_ContentGenre
        //         group by ContentId
        //     ) CG ON C.ContentId = CG.ContentID`
        // )
        data.content = result;
        if(result.length){
            let c = result
            for(let i = 0;i<c.length;i++){
                let g = c[i]['genre']
                g = g.split(',')
                c[i]['genre'] = g
            }
        }
        connection.end()
  
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end(function() {
                    console.log("Connection to database closed.");
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)

})


app.get('/api/all-movies', async (req, res) => {
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let content = await query(
            `select * from Content`
        )

        // let topRated = await query(
        //     `select ContentID, name , 
        //         (select ContentType
        //         from F21_S001_16_ContentLocation CL
        //         where C.ContentID = CL.ContentID) as contentType
        //     from Content C
        //     where ContentID in (
        //         select ContentID
        //         from F21_S001_16_Watches
        //         group by ContentID
        //         order by count(ContentID) desc
        //         )
        //     limit 5`
        // )
        data = {content}
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();           
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
    // if(connection){
    //     connection.end();
    // }

})

// app.post('/api/popular', async (req, res) => {
//     let data = {mostViewed:[]}
//     let q = req.body.type
//     try {
//         // conn();
//         let connection = mysql.createConnection(config);
//         connection.connect();
//         let query = util.promisify(connection.query).bind(connection);

//         let mostViewed = []

//         if(q?.length){
//             mostViewed = await query(
//                 `select W.views, C.ContentID, C.name, C.image_data, CG.Genre, CL.contentType
//                 from Content C, F21_S001_16_ContentLocation CL, (
//                         select ContentId, GROUP_CONCAT(Genre) as Genre
//                         from F21_S001_16_ContentGenre
//                         group by ContentID
//                     ) CG, (select ContentID , count(CustomerID) as views
//                     from F21_S001_16_Watches
//                     group by ContentID
//                     ) W
//                 where C.ContentId = CG.ContentID and CL.ContentID = C.ContentID 
//                 and CL.ContentType = '${q}' and C.ContentID = W.ContentID
//                 order by W.views desc
//                 limit 10`
//             )
//         }else{
//             mostViewed = await query(
//                 `select C.ContentID, C.name, C.image_data, CG.Genre, CL.contentType, W.views
//                 from (select ContentID , count(CustomerID) as views
//                     from F21_S001_16_Watches
//                     group by ContentID
//                     ) W, Content C, F21_S001_16_ContentLocation CL, (
//                         select ContentId, GROUP_CONCAT(Genre) as Genre
//                         from F21_S001_16_ContentGenre
//                         group by ContentID
//                     ) CG
//                 where C.ContentID = W.ContentID and C.ContentId = CG.ContentID 
//                 and CL.ContentID = C.ContentID
//                 order by W.views desc
//                 limit 20`
//             )
//         }

//         data = {mostViewed}
//         connection.end()

//     } catch (err) {
//         console.error('why this error: ', err);
//     } finally {
//         if (connection) {
//             try {
//                 connection.end();           
//             } catch (err) {
//             console.error(err);
//             }
//         }
//     }
//     res.send(data)
// })


app.post('/api/popular', async (req, res) => {
    let data = {mostViewed:[]}
    let q = '';
    if(req.body.type){
        q = req.body.type
    }
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let mostViewed = []

        if(q){
            mostViewed = await query(
                `select * from Content
                where type = '${q}'
                order by views desc
                limit 20`
            )
        }else{
            mostViewed = await query(
                `select * from Content
                order by views desc
                limit 20`
            )
        }
       

        data = {mostViewed}
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();           
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.get('/api/best-rated', async (req, res) => {
    let data = {bestRated:null}
    // data.rating = Number(req.body.rating)
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        // let bestRated = await query(
        //     `select C.ContentID, C.name, C.image_data, CG.Genre,
        //         (select avg(Rating)
        //         from F21_S001_16_RatingReview RR
        //         group by RR.ContentID
        //         having C.contentID = RR.ContentID
        //         )as avgRating,
        //         (select count(Rating)
        //         from F21_S001_16_RatingReview RR
        //         group by RR.ContentID
        //         having C.contentID = RR.ContentID
        //         )as ratingCount
        //     from Content C JOIN (
        //         select ContentId, GROUP_CONCAT(Genre) as Genre
        //         from F21_S001_16_ContentGenre
        //         group by ContentId
        //     ) CG ON C.ContentId = CG.ContentID
        //     where C.contentID in (
        //         select contentID
        //         from F21_S001_16_RatingReview R2
        //         where C.contentID = R2.contentID
        //         group by R2.contentID
        //         having avg(Rating) >= ${req.body.rating}
        //     )
        //     order by avgRating asc`
        // )

        let bestRated = await query(
            `select * from Content where average_rating >= 7
            order by average_rating asc limit 10`
        )
        data.bestRated = bestRated
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
      
})


app.get('/api/shows', async (req, res) => {
    let data = {shows:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let shows = await query(
            `select * from Content where type = 'TV'`
        )

        // let bestRated = await query()

        if(shows.length){
            let c = shows
            for(let i = 0;i<c.length;i++){
                let g = c[i]['genre']
                g = g.split(',')
                c[i]['genre'] = g
            }
        }

        data.shows = shows
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.get('/api/movies', async (req, res) => {
    let data = {movies:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        // let movies = await query(
        //     `select C.ContentID, C.name, C.image_data, C.average_rating, CG.Genre, CL.ContentType
        //     from Content C, F21_S001_16_ContentGenre CG , F21_S001_16_ContentLocation CL
        //     where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID and CL.ContentType = 'Movie'
        //     `
        // )
        // let common = await query(
        //     `select C.ContentID, C.name, C.image_data, C.average_rating, CL.ContentType
        //     from Content C , F21_S001_16_ContentLocation CL
        //     where C.ContentID = CL.ContentID and CL.ContentType = 'Movie'
        //     order by C.average_rating desc`
        // )

        let movies = await query(
            `select * from Content where type = 'Movie'`
        )

        if(movies.length){
            let c = movies
            for(let i = 0;i<c.length;i++){
                let g = c[i]['genre']
                g = g.split(',')
                c[i]['genre'] = g
            }
        }

        data.movies = movies
        // data.common = common
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.post('/api/new-releases', async (req, res) => {
    let q = req.body.query
    let data = {content:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let content = []

        if(q.length){
            content = await query(
                `select * from Content where type = "${q}" order by release_date desc limit 10`
            )
        }else{
            content = await query(
                `select * from Content order by release_date desc limit 10`
            )   
        }
        data.content = content;
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)
})

app.post('/api/search', async (req, res) => {
    let q = req.body.query
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        if(q.length){
            let result = await query(
                `select * from Content where lower(name) like '%${q}%' limit 20`
            )
            data = result;
        }
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)
})




app.post('/api/content/:id', async (req, res) => {
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        console.log(req.params.id)
        let result = await query(
            `select * from Content where id = ${req.params.id}`
        )  
        data = result
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/user-list', async (req, res) => {
    let data = {userContent:[]}
    let userID = req.body.userid
    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        // let userContent = await query(
        //     `select U.CustomerID, C.ContentID, C.name, C.image_data, C.release_date, C.average_rating, CG.Genre, CL.ContentType
        //     from Content C, (
        //         select ContentId, GROUP_CONCAT(Genre) as Genre
        //         from F21_S001_16_ContentGenre
        //         group by ContentId
        //     ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
        //     where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
        //     and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        // )

        let userContent = await query(
            `select U.id, C.id, C.name, C.image_data, C.release_date, C.average_rating, C.genre, C.type
            from Content C, Watches W, User U
            where U.id = '${userID}' and C.id = W.content_id and W.user_id = '${userID}'`
        )

        // if(shows.length){
        //     let c = shows
        //     for(let i = 0;i<c.length;i++){
        //         let g = c[i]['Genre']
        //         g = g.split(',')
        //         c[i]['Genre'] = g
        //     }
        // }

        data.userContent = userContent
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})


app.post('/api/add-to-list', async (req, res) => {
    let data = {userContent:[],updatedContent:[]}
    let uid = req.body.user_id
    let cid = req.body.content_id
    var todayDate = new Date().toISOString().slice(0,10);

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        // let userContent = await query(
        //     `INSERT INTO F21_S001_16_Watches (ContentID, CustomerID, WatchingDate, WatchingTime) VALUES (${cid},${userID},'${todayDate}','00:15')`
        // )
        // let updatedContent = await query(
        //     `select U.CustomerID, C.ContentID, C.name, C.image_data, C.release_date, C.average_rating, CG.Genre, CL.ContentType
        //     from Content C, (
        //         select ContentId, GROUP_CONCAT(Genre) as Genre
        //         from F21_S001_16_ContentGenre
        //         group by ContentId
        //     ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
        //     where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
        //     and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        // )

        let userContent = await query(
            `INSERT INTO Watches (content_id, user_id) VALUES (${cid},${uid})`
        )

        let updatedContent = await query(
            `select U.id, C.id, C.name, C.image_data, C.release_date, C.average_rating, C.genre, C.type
            from Content C, Watches W, User U
            where U.id = '${uid}' and C.id = W.content_id and W.user_id = '${uid}'`
        )
       
        data.userContent = userContent
        data.updatedContent = updatedContent
        data.userContent = userContent
        connection.commit()
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/remove-from-list', async (req, res) => {
    let data = {userContent:[],updatedContent:[]}
    let uid = req.body.user_id
    let cid = req.body.content_id

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let userContent = await query(
            `DELETE FROM Watches where content_id = ${cid} and user_id = ${uid}`
        )
        // let updatedContent = await query(
        //     `select U.CustomerID, C.ContentID, C.name, C.image_data, C.release_date, C.average_rating, CG.Genre, CL.ContentType
        //     from Content C, (
        //         select ContentId, GROUP_CONCAT(Genre) as Genre
        //         from F21_S001_16_ContentGenre
        //         group by ContentId
        //     ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
        //     where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
        //     and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        // )
        let updatedContent = await query(
            `select U.id, C.id, C.name, C.image_data, C.release_date, C.average_rating, C.genre, C.type
            from Content C, Watches W, User U
            where U.id = '${uid}' and C.id = W.content_id and W.user_id = '${uid}'`
        )
        data.userContent = userContent
        data.updatedContent = updatedContent
        connection.commit()
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/country-content', async (req, res) => {
    let location = req.body.country
    let data = {list:null}
    try {
    
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let result = await query(
            `select C.ContentID, C.name, C.image_data 
            from F21_S001_16_ContentLocation CL JOIN Content C ON CL.ContentID = C.ContentID
            where CL.CONTENTLOCATION = '${location}' 
            order by C.ContentID asc`
        )  
        data.list = result
        connection.end()

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

var listener = app.listen(PORT, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8000
});