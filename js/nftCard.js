import constants from "./constants.js";
import overlay from "./overlay.js";

function createNFTcard(data) {
    data.forEach((nft) => {
        const { name, description, image_url, sales, creator, id } = nft;
        const  nftCard = createElement(
            "article",
            {
              className: "nft",
            },
            constants.content,
        );
        createElement(
            "img",
            {
                className: "nft_img",
                src: `${image_url ? image_url : "../Assets/Image/image_not_found.png"}`,
                alt: `${name}`
            },
            nftCard,
        );
        createElement(
          "img",
          {
              className: "icon-fav",
              src: "../Assets/Image/star-outline.svg",
              alt: `add to favorite`
          },
          nftCard,
      );
        const nftInfo = createElement(
            "div",
            {
                className: "nft-info",
            },
            nftCard,
        );
        createElement(
            "h3",
            {
                className: "nft-title",
                textContent: `${name ? name : constants.errorMessage[3].label}`
            },
            nftInfo,
        );
        const nftStats  = createElement(
          "div",
          {
            className: "nft-stats",
          },
          nftInfo,
        );
        createElement(
          "p",
          {
            className: "nft-creator",
            textContent: `Creator: ${creator.username ? creator.username : constants.errorMessage[0].label}`,
          },
          nftStats,
        );
        createElement(
          "span",
          {
            className: `${updateSalesColor(sales)}`,
            textContent: `Sale's number: ${sales}`,
          },
          nftStats,
        );
        const nftDesc = createElement(
          "div",
          {
            className: "nft-desc",
          },
          nftInfo,
        );
        createElement(
          "h4",
          {
            className: "desc-title",
            textContent: "Description"
          },
          nftDesc,
        );
        createElement(
          "p",
          {
            className: "desc-paraph",
            innerHTML:`${description ? descSize(description) : constants.errorMessage[1].label}<br/>`
          },
          nftDesc,
        );
        createElement(
          "button",
          {
            className: "show-more",
            id: `${id}`,
            textContent: "Show more",
          },
          nftDesc,
        );
    
        document.getElementById(id).addEventListener("click", () => {
          console.log(id);
          overlay.openOverlay(nft);
        });
      });
}


function createElement(tag, prop, parentELM) {
  const elm = document.createElement(tag);

  for (const e in prop) {
    if (e === "data") {
      Object.keys(prop[e]).forEach((key) => {
        elm.setAttribute(`data-${key}`, prop[e][key]);
      });
    } else if (e === "events") {
      prop[e].forEach((event) => {
        const { type, action, params = [] } = event;
        let Params = [];
        params.forEach((param) => {
          if (param === "this") {
            Params.push(elm);
          } else {
            Params.push(param);
          }
        });
        elm.addEventListener(type, function () {
          action(...Params);
        });
      });
    } else if (e === "style") {
      Object.keys(prop[e]).forEach((key) => {
        elm.style[key] = prop[e][key];
      });
      // TODO: add styles
    } else {
      elm[e] = prop[e];
    }
  }

  if(parentELM){
      parentELM.appendChild(elm);
  }else{
    constants.content.appendChild(elm);
  }

  return elm;
}

function descSize (word){
  if (word.length > 60){
    let wordSlice = word.slice(0, 60);
    return wordSlice.concat('...');

  }else if(word == ""){
    return word = `<p style="opacity : 0.5;">Not available</p> `;
  }
  else{
    return word;
  }
}

function updateSalesColor(sales) {
  if (sales >= 20) {
    return "red";
  } else {
    return "green";
  }
}

export default {
  createElement,
  createNFTcard,
};
