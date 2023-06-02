module.exports = async function pagination(pg) {
    let page=pg
   // console.log(req.query.page);
    if (!page||page==0) {
      page=1
    }

    let offset = (page-1) * 10;

   return data ={
        offset:offset,
        page:page

    }
}