const minify = require('html-minifier').minify;

function cleanHTMLContent(document, nodeFilter, isImageBlog) {
  const body = document.querySelector('body');

  body.querySelectorAll('code').forEach((codeElement) => {
    if (codeElement.parentElement?.classList.contains('code')) {
      return;
    }

    const codeContent = codeElement.textContent.trim();

    const divElement = document.createElement('div');
    divElement.classList.add('code');
    divElement.textContent = codeContent;

    codeElement.replaceWith(divElement);
  });

  body.querySelectorAll('script, style, header, div.footer-wrapper, div[data-elementor-type="header"]')
    .forEach((el) => el.remove());

  body.querySelectorAll('*').forEach((element) => {
    if (element.classList.contains('code')) {
      return;
    }
    let imgDetails = {}
    const isImage = element.tagName === 'IMG'
    if (isImage) { imgDetails.src = element.getAttribute('src'); imgDetails.alt = element.getAttribute('alt') };

    for (let i = element.attributes.length - 1; i >= 0; i--) {
      element.removeAttribute(element.attributes[i].name);
    }

    if (isImage && isImageBlog) {
      element.setAttribute('src', imgDetails.src)
      element.setAttribute('alt', imgDetails.alt)
      element.setAttribute('class', 'cta_image')
    };
  });

  let changed = true;
  while (changed) {
    changed = false;
    removeWhitespaceTextNodes(body, document, nodeFilter);
    changed = removeEmptyElements(body, isImageBlog) || changed;
    const flattened = flattenSingleChildChains(body);
    changed = flattened || changed;
    removeWhitespaceTextNodes(body, document, nodeFilter);
  }
}

function removeUnwantedContent(document) {
  const tasks = [
    removePosts,
    modifyIntroduction,
    removeFAQHeadingAndAfter,
    removeLookingForSomething,
    removeAuthorBox,
    removeCTASection,
    removeElementsWithPopupType,
    removeLeadServiceHeading,
    removeNutshellContent,
    removeCategories,
    removeForms,
    removeTableOfContents,
    removeScrollToTopText,
    replaceOlWithUl,
  ];

  tasks.forEach((task) => task(document));
}

function removeWhitespaceTextNodes(root, document, NodeFilter) {
  const SHOW_TEXT = NodeFilter?.SHOW_TEXT ?? 4;
  const walker = document.createTreeWalker(root, SHOW_TEXT);
  let currentNode = walker.nextNode();
  while (currentNode) {
    const next = walker.nextNode();
    if (!currentNode.nodeValue.trim()) {
      currentNode.remove();
    }
    currentNode = next;
  }
}

function removeEmptyElements(root, isImageBlog) {
  let removedSomething = false;
  root.querySelectorAll('*').forEach((node) => {
    const isImage = node.tagName === 'IMG'
    let isRemoveAbleImage = true
    if (isImage && isImageBlog) {
      const imgSrc = node.getAttribute('src');
      isRemoveAbleImage = imgSrc.includes('.gif')
    }
    if (!node.textContent.trim() && node.children.length === 0 && isRemoveAbleImage) {
      node.remove();
      removedSomething = true;
    }
  });
  return removedSomething;
}

function flattenSingleChildChains(root) {
  let flattened = false;
  root.querySelectorAll('*').forEach((el) => {
    if (['UL', 'OL', 'TABLE'].includes(el.tagName)) {
      return;
    }
    while (el.children.length === 1) {
      const onlyChild = el.children[0];

      if (onlyChild.children.length === 1) {
        while (onlyChild.firstChild) {
          el.appendChild(onlyChild.firstChild);
        }
        onlyChild.remove();
        flattened = true;
      } else {
        break;
      }
    }
  });
  return flattened;
}

function replaceOlWithUl(document) {
  document.querySelectorAll('ol').forEach((ol) => {
    const ul = document.createElement('ul');
    while (ol.firstChild) {
      ul.appendChild(ol.firstChild);
    }
    ol.replaceWith(ul);
  });
}


function serializeAndMinify(document) {
  const body = document.querySelector('body');
  const modifiedHTML = body.innerHTML;
  return minify(modifiedHTML, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true,
  });
}

function modifyIntroduction(document) {
  const elementsWithSettings = document.querySelectorAll('[data-settings]');

  elementsWithSettings.forEach((element) => {
    try {
      if (element.closest('.footer-wrapper')) {
        return;
      }

      const introParagraph = element.querySelector('p');
      if (introParagraph) {
        const introText = introParagraph.textContent.replace(/\s+/g, ' ').trim();

        if (introText) {
          let h2Introduction = Array.from(document.querySelectorAll('h2')).find(
            (h2) => h2.textContent.trim().toLowerCase() === 'introduction'
          );

          if (h2Introduction) {
            const pIntroduction = document.createElement('p');
            pIntroduction.textContent = introText;
            h2Introduction.insertAdjacentElement('afterend', pIntroduction);
          } else {
            const body = document.querySelector('body');
            h2Introduction = document.createElement('h2');
            h2Introduction.textContent = 'Introduction';

            const pIntroduction = document.createElement('p');
            pIntroduction.textContent = introText;

            body.insertAdjacentElement('afterbegin', pIntroduction);
            body.insertAdjacentElement('afterbegin', h2Introduction);
          }
        }
      }
    } catch (error) {
      console.error("Error modifying introduction:", error);
    }
  });
}

function removePosts(document) {
  const dataId = "63d827b";
  const targetDiv = document.querySelector(`div[data-id="${dataId}"]`);
  const targetDiv2 = document.querySelector(".elementor-posts")
  if (targetDiv) {
    const nextSibling = targetDiv.nextElementSibling;
    if (nextSibling && nextSibling.tagName.toLowerCase() === 'div') {
      nextSibling.remove();
    }
    targetDiv.remove();
  }

  if (targetDiv2) {
    targetDiv2.remove();
  }
}

function removeFAQHeadingAndAfter(document) {
  const faqsHeading = [
    "Frequently Asked Question - FAQs",
    "Frequently Asked Questions - FAQ's",
    "Frequently Asked Questions"
  ];
  const h2Elements = document.querySelectorAll('h2');
  let foundFAQ = false;

  h2Elements.forEach((h2) => {
    if (foundFAQ) return;

    const headingText = h2.textContent?.trim().toLowerCase().replace(/\s+/g, '').replace("–", "-").replace("’", "'");
    const isFAQHeading = faqsHeading.some((faq) => {
      return headingText?.includes(faq.toLowerCase().trim().replace(/\s+/g, ''));
    });

    if (isFAQHeading) {
      foundFAQ = true;


      const siblingsToRemove = [];
      let sibling = h2.nextElementSibling;
      while (sibling) {
        siblingsToRemove.push(sibling);
        sibling = sibling.nextElementSibling;
      }

      siblingsToRemove.forEach((sibling) => sibling.remove());
      h2.remove();
    }
  });
  document.querySelectorAll('.elementor-accordion, .eael-adv-accordion').forEach((accordion) => {
    accordion.remove();
  });
}

function removeLookingForSomething(document) {
  const textToMatch = "Looking For Something Else? Check Out FuturByte's Leading Services";
  const targetDivs = document.querySelectorAll('.e-con-inner div[data-element_type="widget"], .e-con-inner div.elementor-heading-title');
  targetDivs.forEach((div) => {
    const content = div.textContent.toLowerCase();
    if (content.includes(textToMatch.toLowerCase().replace("’", ","))) {
      div.remove();
      let nextElement = document.body.firstChild;
      let shouldRemove = false;
      while (nextElement) {
        const nextSibling = nextElement.nextSibling;
        if (nextElement === div) {
          shouldRemove = true;
        }
        if (shouldRemove && nextElement !== div) {
          nextElement.remove();
        }
        nextElement = nextSibling;
      }
    }
  });

  const tables = document.querySelectorAll('table');

  for (const table of tables) {
    const thead = table.querySelector('thead');
    if (thead) {
      const theadText = thead.textContent.toLowerCase();
      if (
        theadText.includes('service') &&
        theadText.includes('description') &&
        theadText.includes('resource')
      ) {
        table.remove();
        break;
      }
    }
  }

}

function removeAuthorBox(document) {
  const classToMatch = 'elementor-widget-author-box';
  const elements = document.querySelectorAll(`.${classToMatch}`);
  elements.forEach((element) => {
    element.remove();
  });
}

function removeCTASection(document) {
  const classToMatch = 'elementor-element-977542e';
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.classList.contains(classToMatch)) {
      section.remove();
    }
  });
}

function removeElementsWithPopupType(document) {
  const popupElements = document.querySelectorAll('[data-elementor-type="popup"]');
  popupElements.forEach((element) => {
    element.remove();
  });
}

function removeLeadServiceHeading(document) {
  const targetClass = "elementor-heading-title";
  const elements = document.querySelectorAll(`.${targetClass}`);
  elements.forEach((el) => {
    if (el.tagName !== "H2") {
      el.remove();
    }
  });
}

function removeNutshellContent(document) {
  const targetClass = "elementor-drop-cap-yes";
  const firstElement = document.querySelector(`.${targetClass}`);
  if (firstElement) {
    firstElement.remove();
  }
  document.body.innerHTML = document.body.innerHTML.replace(/In a Nutshell/g, "").trim();
}

function removeCategories(document) {
  const elementsWithRelTag = document.querySelectorAll('[rel="tag"]');
  const elementsToRemove = [...elementsWithRelTag];
  elementsToRemove.forEach((element) => {
    element.remove();
  });

  const categoryElement = document.querySelectorAll("span")
  categoryElement.forEach((element) => {
    if (element.textContent.toLowerCase().trim().includes("category")) {
      element.parentElement.remove();
    }
  });
}

function removeForms(document) {
  const targetId = "form";
  const element = document.getElementById(targetId);
  if (element) {
    element.remove();
  }

  const targetClasses = ["elementor-form"]
  targetClasses.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((el) => {
      el.remove();
    });
  });
}

function removeTableOfContents(document) {
  const textToMatch = "Table of Contents";
  const h4Elements = document.querySelectorAll("h4");
  h4Elements.forEach((h4) => {
    if (h4.textContent.trim().includes(textToMatch)) {
      h4.remove();
    }
  });
}

function removeScrollToTopText(document) {
  const element = document.getElementById('scroll-to-top-text');
  if (element) {
    element.remove();
  }
}

function addNewContent(document) {
  addReachUsTag(document)

}

async function modifyHTML({ document, nodeFilter, isImageBlog }) {
  try {
    removeUnwantedContent(document);
    cleanHTMLContent(document, nodeFilter, isImageBlog);
    addNewContent(document)
    const htmlContent = serializeAndMinify(document);
    return htmlContent
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return null;
  }
}

function addReachUsTag(document) {
  const body = document.querySelector('body');

  const anchorTag = document.createElement('a')
  anchorTag.setAttribute('href', '/contact-us')

  const tag1 = document.createElement('sup');
  tag1.textContent = 'Benefits of Choosing Futurbyte';
  anchorTag.appendChild(tag1);

  body.appendChild(anchorTag)

  const h2Headings = Array.from(body.querySelectorAll('h2'));
  const centerHeadingIndex = Math.floor(h2Headings.length / 2);

  if (h2Headings[centerHeadingIndex]) {
    const anchorTag2 = document.createElement('a')
    anchorTag2.href = '/contact-us';

    const tag2 = document.createElement('s');
    tag2.textContent = 'Reach Out To Us';

    anchorTag2.appendChild(tag2)
    h2Headings[centerHeadingIndex].insertAdjacentElement('beforebegin', anchorTag2);
  }
}


module.exports = { modifyHTML };
