import React from "react";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import HomeMasthead from "../../components/HomeMasthead/HomeMasthead";
import HomeMarketing from "../../components/HomeMarketing/HomeMarketing";
import HomeNews from "../../components/HomeNews/HomeNews";

const HomePage = () => {
    return (
        <>
            <GlobalNav />

            <HomeMasthead />
            <HomeMarketing />
            <div className="container mx-auto flex flex-col min-h-screen">
                <HomeNews />
            </div>

            <GlobalFooter />
        </>
    );
};

export default HomePage;
