import React from "react";

export const API_URL = process.env.NODE_ENV === "development"
    ?
        "http://116.39.192.223:5000"
    :
        "http://Montap-env.eba-fnbxy2ap.ap-northeast-2.elasticbeanstalk.com";