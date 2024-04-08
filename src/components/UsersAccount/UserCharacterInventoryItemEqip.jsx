import React from "react";

const UserCharacterInventoryItemEqip = () => {

    return (
        <React.Fragment>
            <div className="preview-character-eqip-main-row">
                <div className="preview-character-eqip-btn-wrap">
                    <span className="preview-character-eqip-title"><h4>Экипировка:</h4></span>
                    <span className="preview-character-eqip-btn"></span>
                </div>
                <div className="preview-character-eqip-popup-wrap">
                    <div className="preview-character-eqip-popup-close-wrap">
                        <span className="preview-character-eqip-popup-close-btn"></span>
                    </div>
                    <div className="preview-character-eqip-popup-header">
                        <h3>Надетые вещи</h3>
                    </div>
                    <div className="preview-character-eqip-popup-body">
                        <div className="preview-character-eqip-popup-character-head">head</div>
                        <div className="preview-character-eqip-popup-character-neck">neck</div>
                        <div className="preview-character-eqip-popup-character-sholder">sholders</div>
                        <div className="preview-character-eqip-popup-character-sholder-body">body</div>
                        <div className="preview-character-eqip-popup-character-sholder-ring-l">ring-l</div>
                        <div className="preview-character-eqip-popup-character-sholder-ring-r">ring-r</div>
                        <div className="preview-character-eqip-popup-character-sholder-waist">waist</div>
                        <div className="preview-character-eqip-popup-character-sholder-legs">legs</div>
                        <div className="preview-character-eqip-popup-character-sholder-feets">feets</div>
                    </div>
                    <div className="preview-character-eqip-popup-footer"></div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterInventoryItemEqip;