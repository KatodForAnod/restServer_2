import "@babel/polyfill";
import * as ArticlesModel from './articles';

async function ArticlesProcess()
{

    let articles = await ArticlesModel.all();
    console.log('articles count = ' + articles.length);

    let ind = Math.floor(Math.random() * articles.length);
    console.log('select index ' + ind + ', id = ' + articles[ind].id);

    let article = await ArticlesModel.one(ind);
    console.log(article);

    let statusDeleting = await ArticlesModel.remove(ind);
    console.log('что с удалением? - ' + statusDeleting);

    articles = await ArticlesModel.all();
    console.log('articles count = ' + articles.length);

    return articles;
}

ArticlesProcess().then( () => {}, (e) => {console.log(e); });