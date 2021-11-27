/**
 * @description      :
 * @author           : Michael
 * @group            :
 * @created          : 27/11/2021 - 09:59:48
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 27/11/2021
 * - Author          : Michael
 * - Modification    :
 **/
const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;




const generateScrapeUrl = (API_KEY) =>  `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Bewitch Scrapper API");
});


//Fetch product details

app.get("/products/:productId", async (req, res)=>{
	const { productId } = req.params
const {API_KEY} = req.query
	try {
		const response = await request(`${generateScrapeUrl(API_KEY)}&url=https://www.amazon.com/dp/${productId}`)
		res.json(JSON.parse(response))
	} catch (error) {
		res.json(error)
	}
} )

// Fetch product reviews
app.get("/products/:productId/reviews", async (req, res)=>{
	const { productId } = req.params
const {API_KEY} = req.query
	try {
		const response = await request(`${generateScrapeUrl(API_KEY)}&url=https://www.amazon.com/product-reviews/${productId}`)
		res.json(JSON.parse(response))
	} catch (error) {
		res.json(error)
	}
} )


//Fetch product offers 

app.get("/products/:productId/offers", async (req, res)=>{
	const { productId } = req.params
const {API_KEY} = req.query
	try {
		const response = await request(`${generateScrapeUrl(API_KEY)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
		res.json(JSON.parse(response))
	} catch (error) {
		res.json(error)
	}
} )

//Fetch search results
app.get("/search/:searchQuery", async (req, res)=>{
	const { searchQuery } = req.params
const {API_KEY} = req.query
	try {
		const response = await request(`${generateScrapeUrl(API_KEY)}&url=https://www.amazon.com/s?k=${searchQuery}`)
		res.json(JSON.parse(response))
	} catch (error) {
		res.json(error)
	}
} )



app.listen(PORT, () => {
  console.log(`Server runniung on PORT ${PORT}`);
});
