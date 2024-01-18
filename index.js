const express=require('express')
require('dotenv').config();
const request=require("request-promises")
const app=express();




const generateScrapperURL=(apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
const port = process.env.PORT ;





app.get('/',(req,res)=>{
    res.send("Welcome to amazon scrapper website");

})

//get product detail
app.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_Key}=req.query;

    try {
        const response = await request(`${generateScrapperURL(api_Key)}&url=https://www.amazon.in/dp/${productId}`);
        res.json(response);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

//get product review
app.get('/product/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const {api_Key}=req.query;

    try {
        const response = await request(`${generateScrapperURL(api_Key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.json(response);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});


//get product offers
app.get('/product/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_Key}=req.query;
    try {
        const response = await request(`${generateScrapperURL(api_Key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(response);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});


//get search result
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const {api_Key}=req.query;

    try {
        const response = await request(`${generateScrapperURL(api_Key)}&url=https://www.amazon.in/s?k=${searchQuery}`);
        res.json(response);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});





app.listen(port,()=>{
   console.log(`App is listening on ${port}`)
})

