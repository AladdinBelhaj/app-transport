import React from "react";
import styles from "./Login.module.css";
import Image from "next/image";

const login = () => {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Image
          className={styles.img}
          src="/assets/bg-login.png"
          alt=""
          width={900}
          height={400}
        />
      </div>

      <div className={styles.right}>
        <div className="card w-95 h-95 bg-base-100 shadow-xl">
          <div className="card-body">
            {/* <h2 className="card-title">Card title!</h2> */}
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default login;
