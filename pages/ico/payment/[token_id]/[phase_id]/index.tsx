import ScaletonLoading from "components/common/ScaletonLoading";

import SelectDeposit from "components/deposit/selectDeposit";
import LaunchPad from "components/ico/LaunchPad";

import BankPayment from "components/ico/payment/Bank-payment";
import CryptoPayment from "components/ico/payment/CryptoPayment";
import PaypalPayment from "components/ico/payment/PaypalPayment";
import StripePayment from "components/ico/payment/StripePayment";
import {
  BANK_DEPOSIT,
  CRYPTO_DEPOSIT,
  PAYPAL,
  PHASE_SORT_BY_RECENT,
  STRIPE,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getLaunchpadListDetailsAction,
  TokenBuyPageAction,
} from "state/actions/launchpad";

const Index = () => {
  const { t } = useTranslation("common");
  const [selectedMethod, setSelectedMethod] = useState<any>({
    method: BANK_DEPOSIT,
  });
  const [launchpadListDetails, setLaunchpadListDetails]: any = useState([]);
  const router = useRouter();
  const [initialData, setInitialData] = useState<any>({
    phase_id: 0,
    token_id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<any>({});
  useEffect(() => {
    TokenBuyPageAction(setPageInfo, setLoading);
  }, []);
  useEffect(() => {
    setInitialData({
      phase_id: router.query.phase_id,
      token_id: router.query.token_id,
    });
  }, [router.query]);

  useEffect(() => {
    getLaunchpadListDetailsAction(
      setLaunchpadListDetails,
      router.query.phase_id
    );
  }, []);
  return (
    <div>
      <div className="page-main-content">
        <div className="container-fluid">
          <div className="deposit-page">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Token Payment")}</h2>
              </div>
            </div>
            {/* {JSON.stringify(launchpadListDetails)} */}
            <div className="asset-balances-area">
              <div className="section-wrapper boxShadow bank-section">
                <div className="container">
                  <div className="deposit-conatiner">
                    <LaunchPad
                      viewMore={false}
                      data={launchpadListDetails.data}
                      core={PHASE_SORT_BY_RECENT}
                      image={false}
                    />
                    <div className="cp-user-title">
                      <h4>{t("Select method")}</h4>
                    </div>

                    {pageInfo?.payment_methods && (
                      <SelectDeposit
                        setSelectedMethod={setSelectedMethod}
                        depositInfo={pageInfo}
                        selectedMethod={selectedMethod}
                      />
                    )}
                    <div className="row">
                      {loading ? (
                        <ScaletonLoading />
                      ) : (
                        <div className={`col-sm-12`}>
                          {parseInt(selectedMethod.method) ===
                          CRYPTO_DEPOSIT ? (
                            <CryptoPayment
                              initialData={initialData}
                              walletlist={pageInfo?.wallet}
                            />
                          ) : parseInt(selectedMethod.method) ===
                            BANK_DEPOSIT ? (
                            <BankPayment
                              pageInfo={pageInfo}
                              initialData={initialData}
                            />
                          ) : parseInt(selectedMethod.method) === STRIPE ? (
                            <StripePayment
                              initialData={initialData}
                              pageInfo={pageInfo}
                            />
                          ) : parseInt(selectedMethod.method) === PAYPAL ? (
                            <PaypalPayment
                              initialData={initialData}
                              pageInfo={pageInfo}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
