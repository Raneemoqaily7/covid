import React from "react";

import { PrimaryNav, MenuLink, Menu } from "./NavElement";
const Navbar = () => {
  return (
    <>
      <img
        alt=""
        src={require("./covid.png")}
        style={{ width: "100%", height: "30%" }}
      />
      <PrimaryNav>
        <Menu>
          <MenuLink to="/" activeStyle>
            Home
          </MenuLink>
          <MenuLink to="/allcountries" activeStyle>
            All Countries
          </MenuLink>
          <MenuLink to="/myrecords" activeStyle>
            My Records
          </MenuLink>
        </Menu>
      </PrimaryNav>
    </>
  );
};
export default Navbar;
