/* eslint-disable no-undef */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagHTML: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list'
}

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
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

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  let html = '';

    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
        /* get the title from the title element */
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags) {
  const MAX = 0;
  const MIN = 999999;
  const params = {max: MAX, min: MIN};

    for (let tag in tags) {
        // if (!tags.hasOwnProperty(tag)) {
        //   return;
        // }
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
        console.log(`${tag}is used${tags[tag]}times`);
    }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.cloudClassCount -1) +1);
  return opt.cloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  const allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(opt.articleTagsSelector);
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
            // const tagHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
            const tagHTMLData = { id: tag, title: tag };
            const tagHTML = templates.tagHTML(tagHTMLData);
            console.log(tagHTML);

            /* add generated code to html variable */
            console.log(tag);
            html = html + tagHTML;
              /* [NEW] check if this link is NOT already in allTags */
              if (allTags[tag]) {
              /* [NEW] add generated code to allTags array */
                allTags[tag]++;
              } else {
                allTags[tag] = 1;
              }

        /* END LOOP: for each tag */
        }

      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
     /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);

    /* [NEW] create variable for all links HTML code*/
    // let allTagsHTML = '';
    const allTagsData = {tags: []};
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {
        /* [NEW] generate code of a link and add it to allTagsHTML */
        // allTagsHTML += tagLinkHTML;
        // const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}"><span>${tag}</span> </a></li>`;
        // console.log('taglinkHTML:', tagLinkHTML);
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
      /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add html from allTagsHTML to taglist */
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
}

generateTags();

function tagClickHandler(event) {

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


function addClickListenersToTags() {

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

function calculateAuthorsParams(authors) {
  const MAX = 0;
  const MIN = 99999;
  const params = { max: MAX, min: MIN };

    for (let author in authors) {
      // if (!authors.hasOwnProperty(author)) {
      //   return;
      // }
        params.max = Math.max(authors[author], params.max);
        params.min = Math.min(authors[author], params.min);
        console.log(author + ' is used ' + authors[author] + ' times');
    }
  return params;
}

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
  const articles = document.querySelectorAll(opt.articleSelector);

    for (let article of articles) {
        const authorWrapper = article.querySelector(opt.articleAuthorSelector);
        let html = '';
        const articleAuthor = article.getAttribute('data-author');
        // const authorLink = `<a href="#author-${articleAuthor}"><span>by ${articleAuthor}</span></a>`;
        const authorLinkData = { id: articleAuthor, title: articleAuthor };
        const authorLink = templates.authorLink(authorLinkData);
        html = html + authorLink;
        console.log(authorLink);
        if (allAuthors[articleAuthor]) {
          allAuthors[articleAuthor]++;
        } else {
          allAuthors[articleAuthor] = 1;
        }
        authorWrapper.innerHTML = html;
    }

  const authorList = document.querySelector(opt.authorsListSelector);
  // let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

    for (let articleAuthor in allAuthors) {
        // allAuthorsHTML += `<li><a href="#author-${articleAuthor}"><span>${articleAuthor}(${(allAuthors[articleAuthor])})</span> </a></li>`;
        allAuthorsData.authors.push({
          articleAuthor,
          author: articleAuthor,
          count: allAuthors[articleAuthor]
        });
    }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  const href = clickedElement.getAttribute('href');
  const authorName = href.replace('#author-', '');
  console.log(authorName);
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

    for (let authorActiveLink of activeAuthorLinks) {
        authorActiveLink.classList.remove('active');
    }
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorLink of allAuthorLinks ) {
        authorLink.classList.add('active');
    }

  generateTitleLinks('[data-author="' + authorName + '"]');
}

function addClickListenersToAuthors() {
const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');
console.log(linksToAuthors);
  for (let link of linksToAuthors) {
      link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
