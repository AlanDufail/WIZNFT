import constants from "./constants.js";
import overlay from "./overlay.js";
import favorite from "./favorite.js";
import shopping from "./shopping.js";

function createNFTcard(data) {
  data.forEach((nft) => {
    const { name, description, image_url, sales, creator, id } = nft;
    const nftCard = createElement(
      "article",
      {
        className: "nft",
      },
      constants.content
    );
    createElement(
      "img",
      {
        className: "nft_img",
        src: `${image_url ? image_url : "../Assets/Image/image_not_found.png"}`,
        alt: `${name}`,
      },
      nftCard
    );
    createElement(
      "img",
      {
        className: "icon-fav",
        src: "../Assets/Image/star-outline.svg",
        alt: constants.errorMessage[4].label,
        events: [
          {
            type: "click",
            action: favorite.addFavorite,
            params: [nft],
          },
        ],
      },
      nftCard
    );
    const nftInfo = createElement(
      "div",
      {
        className: "nft-info",
      },
      nftCard
    );
    createElement(
      "h3",
      {
        className: "nft-title",
        textContent: `${name ? name : constants.errorMessage[3].label}`,
      },
      nftInfo
    );
    const nftStats = createElement(
      "div",
      {
        className: "nft-stats",
      },
      nftInfo
    );
    createElement(
      "p",
      {
        className: "nft-creator",
        textContent: `Creator: ${
          creator.username ? creator.username : constants.errorMessage[0].label
        }`,
      },
      nftStats
    );
    createElement(
      "span",
      {
        className: `${updateSalesColor(sales)}`,
        textContent: `Sales: ${sales}`,
      },
      nftStats
    );
    const nftDesc = createElement(
      "div",
      {
        className: "nft-desc",
      },
      nftInfo
    );
    createElement(
      "h4",
      {
        className: "desc-title",
        textContent: "Description",
      },
      nftDesc
    );
    createElement(
      "p",
      {
        className: "desc-paraph",
        innerHTML: `${
          description ? descSize(description) : constants.errorMessage[1].label
        }<br/>`,
      },
      nftDesc
    );
    const btnWrapper = createElement(
      "div",
      {
        className: "btn-wrapper",
      },
      nftDesc
    );
    createElement(
      "button",
      {
        className: "show-more",
        id: `${id}`,
        textContent: "Show more",
      },
      btnWrapper
    );
    createElement(
      "button",
      {
        className: "show-more",
        id: `${id}`,
        textContent: "Buy",
        events: [
          {
            type: "click",
            action: shopping.addToCart,
            params: [nft],
          },
        ],
      },
      btnWrapper
    );

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      overlay.openOverlay(nft);
    });
  });
}

function createCart(data) {
  data.forEach((nft) => {
    const { name, description, image_url, sales, creator, id } = nft;
    const div = createElement("div", constants.contentCart);
    createElement(
      "img",
      {
        src: `${image_url ? image_url : "../Assets/Image/image_not_found.png"}`,
      },
      div
    );
    const resume = createElement("div", div);
    const div1 = createElement("div", resume);
    createElement(
      "p",
      {
        innerHTML: `${name}<br>`,
      },
      div1
    );
    createElement(
      "p",
      {
        className: `dataId`,
        textContent: `${id}`,
      },
      div1
    );
    createElement(
      "p",
      {
        className: "description",
        textContent: `${descSizePanier(mydata.desc)}`,
      },
      resume
    );
    const div2 = createElement(
      "div",
      {
        className: "panier-button",
      },
      resume
    );
    createElement(
      "button",
      {
        className: "show-more",
        id: `${id}`,
        textContent: "Show more",
      },
      div2
    );
    createElement("a", {
      className: "delete",
      textContent: "Remove",
    });

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      overlay.openOverlay(nft);
    });
  });
}

function createElement(tag, prop, parentELM) {
  const elm = document.createElement(tag);

  for (const e in prop) {
    if (e === "events") {
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
    } else {
      elm[e] = prop[e];
    }
  }

  if (parentELM) {
    parentELM.appendChild(elm);
  } else {
    if (location.pathname === "/projet/pages/favorite.html") {
      constants.contentFav.appendChild(elm);
    }
    if (location.pathname === "/projet/pages/shopping.html") {
      constants.contentCart.appendChild(elm);
    } else {
      constants.content.appendChild(elm);
    }
  }

  return elm;
}

function descSize(word) {
  if (word.length > 55) {
    let wordSlice = word.slice(0, 55);
    return wordSlice.concat("...");
  } else if (word == "") {
    return (word = `<p style="opacity : 0.5;">${constants.errorMessage[1]}</p> `);
  } else {
    return word;
  }
}

function descSizePanier(word) {
  if (word.length > 180) {
    let wordSlice = word.slice(0, 180);
    return wordSlice.concat("...");
  } else if (word == "") {
    return (word = `<p style="opacity : 0.5;">Not available</p> `);
  } else {
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
  createCart,
};
