"use client";

import { useState } from "react";

type TabSwitchTypes = {
    tabViewMap: Map<string, JSX.Element>;
};

const TabSwitch = ({ tabViewMap }: TabSwitchTypes) => {
    const tabs = [...tabViewMap.keys()]
    const firstTab = tabs[0]
    const [tab, setTab] = useState<string>(firstTab);
    const view = tabViewMap.get(tab);

    return (
        <div className="w-full flex flex-col gap-5">

            <ul className="w-full h-[40px] flex">
                {tabs.map((tabLabel, index) => (
                    <li key={tabLabel} className="w-full h-full">
                        <button
                            className={`w-full h-full flex items-center justify-center text-sm font-[400] border-b-2 hover:bg-slate-700 transition-colors
                                            ${tabLabel === tab &&
                                "text-primary-300 border-b-primary-300"
                                }`}
                            onClick={() => setTab(tabLabel)}
                        >
                            {tabLabel}
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                {view}
            </div>
        </div>
    );
};

export default TabSwitch;
