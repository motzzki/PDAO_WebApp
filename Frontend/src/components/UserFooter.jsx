const FooterUser = () => {
    return (
      <div className="text-center text-white mt-4 py-3 footer">
        <p className="">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" id="footer-link">Privacy Policy</a> | 
          <a href="/terms-of-service" id="footer-link"> Terms of Service</a>
        </p>
      </div>
    );
  };

  export default FooterUser;
