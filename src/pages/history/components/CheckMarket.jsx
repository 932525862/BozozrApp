import React, { useRef } from 'react'
import { formatDate, formatDateDot, formatNumberWithSpace, getLangValue } from '../../../utils/utils';
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import Logo from "../../../assets/Loogo.svg";
import { useTranslation } from 'react-i18next';


const CheckMarket = (shoppingHistory, onClose) => {
    const checkRef = useRef(null);
    const {t,i18n} = useTranslation()
    
    const handleDownload = async () => {
        if (!checkRef.current) return;
    
        const node = checkRef.current;
    
        // (ixtiyoriy) OKLCH muammolarini chetlash: computed style -> inline rgb()
        const normalizeColors = (el) => {
          const stack = [el];
          while (stack.length) {
            const e = stack?.pop();
            if (!e) continue;
            const cs = getComputedStyle(e);
            // computedStyle odatda rgb(...) qaytaradi
            if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
              e.style.backgroundColor = cs.backgroundColor;
            }
            if (cs.color) e.style.color = cs.color;
            Array.from(e.children).forEach((c) => stack.push(c));
          }
        };
        normalizeColors(node);
    
        // Rasmga aylantirish (PNG)
        const scale = 2; // sifat (retina)
        const width = node.scrollWidth;
        const height = node.scrollHeight;
    
        try {
          const dataUrl = await htmlToImage.toPng(node, {
            cacheBust: true,
            backgroundColor: "#ffffff",
            pixelRatio: scale,
            width,
            height,
            // CORS bilan muammo bo‘lsa shu placeholder qo‘l keladi
            imagePlaceholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAt8B6Qh0OikAAAAASUVORK5CYII=",
            // Tashqi <img> lar uchun crossOrigin
            // (agar server CORS header yuborsa)
            // NOTE: html-to-image o‘zi handle qiladi, lekin quyidagisi ham foydali:
            // style: { } ni minimal qoldirdik
          });
    
          // PNG -> A4 PDF
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfW = pdf.internal.pageSize.getWidth();
          //@ts-ignore
          const img = new Image();
          img.src = dataUrl;
          await new Promise((res) => (img.onload = res));
    
          const imgW = img.width;
          const imgH = img.height;
          const pdfH = (imgH * pdfW) / imgW;
    
          pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, pdfH);
          pdf.save("market-check.pdf");
          onClose()
        } catch (err) {
          toast.error(t("error_generate_file"));
        }
      };

      function calculateAllProducts(products) {
            if (!Array.isArray(products)) return "0";
          
            const total = products.reduce((sum, p) => {
              if (!p.isBuying) return sum; // faqat isBuying true bo'lganlar
          
              const { calculationType, quantity = 0, price = 0 } = p;
              const subtotal =
                calculationType === "one"
                  ? quantity * price
                  : calculationType === "all"
                  ? price
                  : 0;
          
              return sum + subtotal;
            }, 0);
          
            return formatNumberWithSpace(total);
          }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Chek (yashirin div) */}
          <div
            ref={checkRef}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              maxWidth: "350px",
              width: "100%",
              borderRadius: "0.5rem",
              padding: "1rem",
              fontSize: "0.875rem",
              fontFamily: "sans-serif",
            }}
          >
            {/* Header */}
            <div className="text-center">
              <img src={Logo} alt="Logo" className="w-auto h-10 inline-block" />
            </div>
            <hr style={{ border: "none", height: "1px", backgroundColor: "#E0E0E0", marginTop: "10px", marginBottom: "10px"}} />
    
            {/* Bozorlik nomi */}
            <p
              style={{
                textAlign: "center",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
             {t("checkMarket.marketName")}: {shoppingHistory?.shoppingHistory.name}
            </p>
    
            {/* Mahsulotlar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
              }}
            >
              {shoppingHistory?.shoppingHistory.marketLists?.map((list) => (
                <div
                  key={list.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "4px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {!list.product ? (
                      <div
                        style={{
                          backgroundColor: "#e5e7eb",
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "0.375rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: "1.25rem" }}>📦</span>
                      </div>
                    ) : (
                      <img
                        src={list?.product?.images || "/placeholder.svg"}
                        alt={list?.productName || "Mahsulot"}
                        width={30}
                        height={30}
                        style={{ borderRadius: "0.25rem" }}
                      />
                    )}
                    <div>
                      <p style={{ fontWeight: 500 }}>
                        {getLangValue(list?.product, "title", i18n?.language) || list?.productName}
                      </p>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          lineHeight: "1rem",
                        }}
                      >
                        {`${list?.quantity} ${getLangValue(list?.unit, "name", i18n.language)}`}
                      </p>
                    </div>
                  </div>
                  <p>
                    {list?.calculationType == "one" ? list.price * list.quantity : list.price} {t("checkMarket.currency")}
                  </p>
                </div>
              ))}
            </div>
    
            <hr style={{ border: "none", height: "1px", backgroundColor: "#E0E0E0", marginTop: "10px", marginBottom: "10px"}} />
    
            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>{t("checkMarket.productCount")}:</span>
              <span>{shoppingHistory?.shoppingHistory?.marketLists?.length} {t("checkMarket.itemsCountSuffix")}</span>
            </div>
    
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>{t("checkMarket.totalAmount")}:</span>
              <span>{calculateAllProducts(shoppingHistory?.shoppingHistory?.marketLists)}{t("checkMarket.currency")}</span>
            </div>
    
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>{t("checkMarket.marketLocation")}:</span>
              <span>{shoppingHistory?.shoppingHistory?.location}</span>
            </div>
    
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>{t("checkMarket.date")}:</span>
              <span>{formatDateDot(shoppingHistory?.shoppingHistory?.createdAt)}</span>
            </div>
          </div>
    
          {/* Yuklab olish tugmasi */}
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#06B2B6",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t("checkMarket.downloadButton")}
          </button>
        </div>
      );
}

export default CheckMarket