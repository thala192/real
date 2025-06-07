import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Nav2.module.css";

export type NavType = {
  className?: string;
};

const Nav: FunctionComponent<NavType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLOGOTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onRentTextClick = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onHomeIconClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  return (
    <header className={[styles.nav3, className].join(" ")}>
      <div className={styles.nav3Child} />
      <div className={styles.buttons}>
        <a className={styles.logo} onClick={onLOGOTextClick}>
          LOGO
        </a>
      </div>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <div className={styles.searchBarChild} />
          <img
            className={styles.icbaselineSearchIcon}
            alt=""
            src="/icbaselinesearch.svg"
          />
          <input
            className={styles.searchBarItem}
            placeholder="Search here..."
            type="text"
          />
        </div>
      </div>
      <div className={styles.buttons1}>
        <div className={styles.links}>
          <div className={styles.homeWrapper}>
            <a className={styles.home} onClick={onLOGOTextClick}>
              Home
            </a>
          </div>
          <div className={styles.buyWrapper}>
            <a className={styles.buy} onClick={onBuyTextClick}>
              Buy
            </a>
          </div>
          <div className={styles.homeIconBackground}>
            <a className={styles.rent} onClick={onRentTextClick}>
              Rent
            </a>
          </div>
          <div className={styles.sellWrapper}>
            <a className={styles.sell} onClick={onSellTextClick}>
              Sell
            </a>
          </div>
          <img
            className={styles.homeIcon}
            loading="lazy"
            alt=""
            src="/vector1.svg"
            onClick={onHomeIconClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
