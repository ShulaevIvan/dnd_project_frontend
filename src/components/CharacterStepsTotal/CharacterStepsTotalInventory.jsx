import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoldToCharacterInventory } from "../../redux/slices/characterTotalSlice";

const CharacterStepsInventory = () => {
    const dispatch = useDispatch();
    const classStartItems = useSelector((state) => state.characterSteps.characterSum.classData.startEqip);
    const backgroundItems = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0].items);
    
    useEffect(() => {
        const checkBackgorundItems = backgroundItems.split(',');
        const charMoney = {
            gold: 0,
            silver: 0,
            bronze: 0,
        };
        const pattern = /\d{1,10}\s{1,2}|\d{0,10}(\зм|\см\бр|\зол|\см|\мм|[з]{1})/gm;
        if (checkBackgorundItems && checkBackgorundItems.length > 0) {
            checkBackgorundItems.map((item) => {
                const takeData = item.match(pattern);
                if (takeData && takeData.length > 0 && takeData[0] && takeData[1]) {
                    const gold = takeData[1] === 'зм' ? Number(takeData[0]) : 0;
                    const silverToGold = takeData[1] === 'см' ? (Number(takeData[0]) / 10) * 1 : 0;
                    const bronzeToGold = takeData[1] === 'мм' ? (Number(takeData[0]) / 100) * 1 : 0;
                    
                    charMoney.gold += gold + silverToGold + bronzeToGold;
                }
            });
            if (!Number.isInteger(charMoney.gold)) {
                let gold = Math.trunc(charMoney.gold);

                const silverRemains = (charMoney.gold - gold).toFixed(2);
                if (!Number.isInteger(silverRemains)) {
                    charMoney.silver = silverRemains * 10
                    charMoney.gold = gold
                }
                if (!Number.isInteger(charMoney.silver)) {
                    charMoney.bronze = charMoney.silver * 100;
                }
            }
            dispatch(addGoldToCharacterInventory({
                gold: charMoney.gold,
                silver: charMoney.silver, 
                bronze: charMoney.bronze, 
                method: 'replace',
            }));
        }
    })

    return (
        <React.Fragment>
            <div className="character-total-inventory-title">Start Inventory</div>
            <div className="character-total-inventory-wrap">
                <div className="character-total-inventory-row">
                    <div className="character-inventory-item-wrap">
                        <div className="character-inventory-gold-title">Char gold: </div>
                        <div className="character-inventory-gold-row">
                            <div className="character-inventory-gold-item">
                                <div className="mm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="sm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="zm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="em">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="pm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {classStartItems.weapons.map((weaponItem) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-inventory-item-wrap">{weaponItem.name}</div>
                            </React.Fragment>
                        )
                    })}
                    {classStartItems.armor.map((armorItem) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-inventory-item-wrap">{armorItem.name}</div>
                            </React.Fragment>
                        )
                    })}
                    {classStartItems.instruments.map((instrumentItem) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-inventory-item-wrap">{instrumentItem.name}</div>
                            </React.Fragment>
                        )
                    })}
                    {Array.from(backgroundItems.split(',')).map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-inventory-item-wrap">{item}</div>
                            </React.Fragment>
                        )
                    })}
                </div>
                
                <div className="character-stranges-weakness-row">
                    <div className="character-stranges-wrap">
                        <div className="character-total-stranges-title">Stranges</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                    </div>
                    <div className="character-weakness-wrap">
                        <div className="character-total-weakness-title">Weakness</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsInventory;