import React from "react";


const CharacterStepsPreiew = () => {
    return (
        <React.Fragment>
            <div className="character-steps-preview-column">
                <div className="character-race-preview-wrap">
                    <div className="character-race-preview-title">HiElf</div>
                    <div className="character-race-preview-subtitle">features</div>
                </div>

                <div className="character-race-stats-bonuce">
                    <div className="character-race-stat-value"><span>Увеличение характеристик:</span> Значение вашей Ловкости увеличивается на 2.</div>
                </div>

                <div className="character-race-ability-bonuce">
                    <div className="character-race-ability-bonuce"><span>Test skill:</span> Вы владеете навыком test skill</div>
                    <div className="character-race-ability-bonuce"><span>Test skill:</span> Вы владеете навыком test skill</div>
                </div>

                <div className="character-race-preview-bonuce-skills-wrap">
                    <div className="skill-item">
                        <span>Skill Name:</span> <a href="#">Test skill</a>
                        <div className="skill-short-desc">Тёмное зрение. на расстоянии в 60 футов</div>
                    </div>

                    <div className="skill-item">
                        <span>Skill Name:</span> <a href="#">Test skill</a>
                        <div className="skill-short-desc">Тёмное зрение. на расстоянии в 60 футов</div>
                    </div>

                    <div className="skill-item">
                        <span>Skill Name:</span> <a href="#">Test skill</a>
                        <div className="skill-short-desc">Тёмное зрение. на расстоянии в 60 футов</div>
                    </div>
                </div>
                <div className="character-race-preview-speed">
                        <span>Speed:</span> Ваша базовая скорость ходьбы составляет 30 футов.
                </div>

                <div className="character-race-preview-size">
                    <span>Size:</span> Рост эльфов колеблется между 5 и 6 футами (152 и 183 сантиметрами), у них стройное телосложение. Ваш размер — Средний.
                </div>

                <div className="character-race-preview-age">
                    <span>Age:</span> Несмотря на то, что физически эльфы взрослеют в том же возрасте, что и люди, их понимание о взрослении выходит
                </div>

                <div className="character-race-preview-worldview">
                    <span>Speed:</span> любое
                </div>

                <div className="character-race-gender-wrap">
                    <div className="gender-block-wrap">
                        <div className="gender-block-female gender-selected"><span className="gender-title-f">Female</span></div>
                        <div className="gender-block-male"><span className="gender-title-m">Male</span></div>
                    </div>
                </div>

                <div className="race-description-wrap">
                    <div className="race-description">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.
                            Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и,
                            в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, 
                            в шаблонах которых используется Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiew;