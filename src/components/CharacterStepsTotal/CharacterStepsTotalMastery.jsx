import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { characterMasterySum } from "../../redux/slices/characterTotalSlice";

const CharacterStepsTotalMastery = () => {
    const dispatch = useDispatch();
    const characterClassData = useSelector((state) => state.characterSteps.characterSum.classData);
    const characterBackground = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0]);
    const characterTotalInfo = useSelector((state) => state.characterTotal.characterTotalInfo);


    useEffect(() => {
        const resultArmorMastery = [
            ...characterClassData.classArmorMastery,
            ...characterBackground.armorMastery,
        ];
        const resultWeaponMastery = [
            ...characterClassData.classWeaponMastery,
            ...characterBackground.weaponMastery,
        ];
        const instrumentMastery = [
            ...characterClassData.classInstrumentMastery,
            ...characterBackground.instrumentMastery,
        ];

        dispatch(characterMasterySum({
            armorMastery: resultArmorMastery,
            weaponMastery: resultWeaponMastery,
            instrumentMastery: instrumentMastery,
        }));
    }, []);
    

    return (
        <React.Fragment>
            <div className="character-total-mastery-wrap">
                <div className="character-total-mastery-title">Mastery</div>
                <div className="character-total-mastery-row">
                    <div className="character-total-mastery-weapons">
                        <div className="character-total-mastery-weapons-title">weapons</div>
                        <ul className="character-total-weapon-mastery-list">
                            {characterTotalInfo.weaponMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="character-total-mastery-armor">
                        <div className="character-total-mastery-armor-title">armor</div>
                        <ul className="character-total-armor-mastery-list">
                            {characterTotalInfo.armorMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="character-total-mastery-instruments">
                        <div className="character-total-mastery-instrument-title">instruments</div>
                        <ul className="character-total-instruments-mastery-list">
                            {characterTotalInfo.instrumentMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsTotalMastery;