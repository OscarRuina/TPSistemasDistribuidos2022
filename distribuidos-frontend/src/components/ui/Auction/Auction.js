import React, {useState, useEffect} from "react";

import "./Auction.css";
import axios from 'axios';
import { base64, base64Decode } from "@firebase/util";
import jsPDF from "jspdf";



export default function Auction({auction}) {

    const [isDownload, setIsDownload] = useState(false);
    const BASE_URL = 'http://127.0.0.1:5000';
    const [pdfBase64, setpdfBase64] = useState();

    const getpdfAuctionBase64 = async auction => {
        return await axios
          .post(`${BASE_URL}/pdf/download`, auction)
          .then(res => {
            return res;
          })
          .catch(err => {
            return err;
          });
      };

    useEffect(() => {
      if (isDownload) {
        const getPDF = async () => {
            //setLoading(true);
            await getpdfAuctionBase64(auction).then(res => {
              setpdfBase64(res.data);
              
              //setLoading(false);
            });
          };
       
        getPDF();
        console.log(pdfBase64);
      }
    }, [isDownload])
    console.log(typeof(pdfBase64))
    console.log(pdfBase64);

    return(
        <div>
            <p>{auction.invoiceId}</p>
            <p>{auction.purchaseDate}</p>
            <p>{auction.seller.name}</p>
            <p>{auction.seller.lastname}</p>
            <p>{auction.seller.username}</p>
            <p>{auction.seller.email}</p>
            <p>{auction.buyer.name}</p>
            <p>{auction.buyer.lastname}</p>
            <p>{auction.buyer.username}</p>
            <p>{auction.buyer.email}</p>
           
        {auction.products?.map((product, index)=>{
            return <div key={index}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
            </div>
        })}
        <p>{auction.totalAmount}</p>
        <button onClick={() => setIsDownload(true)}>Descargar factura</button>
        {pdfBase64 && <a href={`data:application/pdf;base64,${pdfBase64}`} download={`factura ${auction.purchaseDate+"-"+auction.invoiceId}.pdf`} >Ya esta</a>}
        <embed src={`data:application/pdf;base64,${pdfBase64}`} />
        </div>
    );
}
