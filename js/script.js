'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    window.scrollTo(0, 0);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }


    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log(clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log(targetArticle);
}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';


    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);

            /* create HTML of the link */
            // titleList.insertAdjacentHTML('beforeend', linkHTML);

            /* insert link into titleList */
            html = html + linkHTML;
        }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {

          /* generate HTML of the link */
            const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span> </a></li>';
            console.log(tagHTML);

            /* add generated code to html variable */
            console.log(tag);
            html = html + tagHTML;

        /* END LOOP: for each tag */
        }

      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let link of activeTagLinks) {

    /* remove class active */
        link.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let link of allTagLinks ) {
          /* add class active */
        link.classList.add('active');
    /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
console.log(linksToTags);
    /* START LOOP: for each link */
    for (let link of linksToTags) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
}

addClickListenersToTags();
