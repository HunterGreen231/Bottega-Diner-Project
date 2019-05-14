// RUN THIS ON CODEPEN (WILL NOT WORK WITH NODE BECAUSE IT REQUIRES PROMPT, AND ALERT)

randomComment = () => {
   min = Math.ceil(0);
   max = Math.floor(3);
   let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   commentVault = [
    'Nice choice!',
    'That is my favorite!',
    "I'll have the cook make it the way you want it!",
    'That sounds good!'
  ]
  return commentVault[randomNumber];
}

menus = () => {
    return {
        mainMenu: function() {
            main = {
                'steak': 20.99,
                'smothered burrito': 17.99,
                'bacon burger': 19.99,
                'double cheese burger': 15.99,
                'salad': 10.99,
            };
            return main;
        },
        sidesMenu: function() {
            sides = {
                'small macaroni and cheese': 3.69,
                'fries': 3.99,
                'baked potatoes': 5.59,
                'mashed potatoes': 3.59,
                'rolls': 2.99,
            };
            return sides;
        }
    }
}

bottegaDiner = () => {
  alert('-Welcome to Bottega Diner-');
}

displayMenus = (menu) => {
  let itemArray = [];  
  for (let item in menu) {
    itemArray.push(item);
  }
    return itemArray.join(", ");
}

checkIfItemOnMenu = (userChoice, menu, sideMenu = false) => {
  if (!sideMenu){
    for(item in menu.mainMenu()) {
      if (item == userChoice) {
        sideMenu = true;
        return true;
      }
    }
  }
  else if (sideMenu){
    for(item in menu.sidesMenu()) {
      if (item == userChoice) {
        return true;
      }
    }
  }
}

onMenus = (userChoice, menus, sideMenu, userCart) => {
  let onMenu = false;
  onMenu = checkIfItemOnMenu(userChoice, menus, sideMenu);
  if (onMenu){
    userCart.push(userChoice);
  } else {
    alert("!NOT ON MENU!")
    promptUser(userCart, menus, sideMenu);
  }
  
}

promptUser = (userCart, menus, sideMenu = false,) => {
  let onMenu = false;
  let userChoice = prompt(`\n ${userCart.length >= 1 ? `${randomComment()}\n` : ''}${sideMenu ? "Side Menu:\n" + displayMenus(menus.sidesMenu()) : "Main Menu:\n" + displayMenus(menus.mainMenu())}\nEnter your${userCart.length === 2 ? ' second' : ''} choice: `).toLowerCase();
  if (userChoice == null) return;
  onMenus(userChoice, menus, sideMenu, userCart);
}


totalUserCart = (userCart, menus) => {
  let total = 0;
  let mainMenu = menus.mainMenu();
  let sidesMenu = menus.sidesMenu();
  for (let i = 0; i < userCart.length; i++){
    for (let item in menus.mainMenu()){
      if (userCart[i] == item) {
        total += mainMenu[item];
      }
    }
    for (let item in menus.sidesMenu()){
      if (userCart[i] == item) {
        total += sidesMenu[item];
      }
    }
  }
  return total.toFixed(2);
}



let userCart = [];

bottegaDiner();
const getMenu = menus();
promptUser(userCart, getMenu);
if (userCart.length === 1) promptUser(userCart, getMenu, true);
if (userCart.length === 2) promptUser(userCart, getMenu, true);
if (userCart.length === 3) alert(`${randomComment()}\nYour order:\n${userCart.join(", ")}\nYour total: ${totalUserCart(userCart, getMenu)}`);