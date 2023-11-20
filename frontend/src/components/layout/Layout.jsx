import React from "react";
// import Footer from "./Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import Header from "./Header/Header";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      {/* <main style={{ minHeight: "74vh" }}> */}
      <div>
        <Toaster />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - shop now",
  description: "mern stack project",
  keywords: "mern, react, mongodb, node",
  author: "Sagarkrydv",
};

export default Layout;
