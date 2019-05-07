# Recommendation system for online purchases - Final

In this final you will use Elasticsearch to build a recommendation system for an online
retail company. It required us to use Elasticsearch to learn what items are frequently purchased together

## The dataset

[Retail dataset](https://archive.ics.uci.edu/ml/datasets/online+retail#)

## Submissions:

 - Final.ipynb: Final Code includes:
    - Read in excel and convert `.xlsx` file to a `.csv` and with some basic data cleansing.
    - Setups for ElasticSearch
    - Read in csv file and group it by `InvoiceNo`
    - Iterate over each group (each invoice) and each row in dataframe to produce messages
    - Fly messages to ElasticSearch
    - Some tries on **Lucene**.
 - Barchart graph: Showed Average Purchased Quantites, Average Purchased UnitPrices, and 
 Unique count of StockCode grouping by Country.
 
 ## Notes:
 
 I tried to make some modification on **message producer** to make messages to "Elasticsearch friendly" such as 
 changing columns type and splitting Description from string to list of words. However, I still got empty bucket 
 in filtering and aggregating process.




