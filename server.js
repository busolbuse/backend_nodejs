const express = require('express')
const app = express()
const PORT = 8383

let data = ['buse']

//middleware ara katman yazilimi 
//sunucuya gelen vir istek nihai uç noktasina(endpoint) ulasmadan önce 
// app.use ile tanimlanan  bu jatmankardan gecerek islenir
//sunucu tarafinda undefined olarak görülmesinin nedeni bu katmanin tanimli olmamasi

//Özetle app.use, isteğin sunucuya ulaştığı an ile yanıtın gönderildiği an arasındaki süreci yöneten bir yapılandırma aracıdı
app.use(express.json()) // to parse json bodies


//type 1-website typically come when a user enters a url in the browser
app.get('/',(req,res)=>{
    console.log('User requested the home page website')
    res.send(`<body style="background-color: lightgrey;
        color: darkblue;">
        <h1>DATA PAGE</h1>
            <p>${JSON.stringify(data)} </p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('this is my script')</script>
        `)
})

app.get('/dashboard',(req,res)=>{
    //this is endpoint number 2
    res.send(`
        <body>
            <h1>DASHBOARD</h1>
            <a href="/">home</a>
        </body>
        `)
})

//Tyoe 2 - API endpoint - (non visual)
//CRUD- method - create-post read-get update- put delete-delete

app.get('/api/data',(req,res)=>{
    console.log('this one was for data ')
    res.status(599).send(data)
})

app.post('/api/data',(req,res)=>{
    //someone wants to create a user (for example when they click a sign up button)
    //the user clicks the sign up button after entering their credentials, and their 
    // browser is wired up to send out 
    // a network request to the server to handle that action

    const newEntry = req.body
    console.log('this is the new entry:',newEntry)
    data.push(newEntry.name) // sitede gorunen yere alice ismini de ekledik

    res.sendStatus(201)//created
    
})

app.delete('/api/data',(req,res)=>{
    data.pop()
    console.log('deleted last entry') //sadece alice i sildik eger olmazsa serviri durdur ve bastan calısıtr data ekle ve sil
    res.sendStatus(203)
})

app.listen(PORT, () => console.log(`server has started on port ${PORT}`))