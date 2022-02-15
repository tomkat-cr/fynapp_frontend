import React from 'react';
import { useLocation } from "react-router-dom";

export function getQueryParamValue(paraName) {
    const search = useLocation().search;
    const value = new URLSearchParams(search).get(paraName);
    return value;
}
