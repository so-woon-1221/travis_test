import React from "react";
import Head from "next/head";

const index = () => (
  <>
    <Head>
      <title>METIS</title>
    </Head>
    <div className="w-full pt-4 md:pl-8 pl-4 pr-4 ">
      <div className="overflow-y-auto border-b flex flex-col md:w-200 space-y-4">
        <h1 className="font-extrabold text-3xl border-b-2 p-2 mb-4">Title</h1>
        <div className="w-full pl-2 h-36">sub menu</div>
        <div className="flex-grow">Detail</div>
        <div className="h-96">test</div>
        <div className="h-96">test</div>
        <div className="h-96">test</div>
        <div className="h-96">test</div>
      </div>
    </div>
  </>
);

export default index;
