import { useState } from "react"
import './BannerEditor.css'

import bmwlogo from '/assets/bmwlogo-removebg-preview.png';
import x1 from '/assets/x1.png'
import x3 from '/assets/x3.png'
import x4 from '/assets/x4.png'




type Option = {
    colourName: string,
    label: string
}

type CarOptions = {
    carModel: string,
    carPicSource: string
}

export function BannerEditor() {


    const [h2text, seth2Text] = useState<string>("Edit banner heading, colour and size by clicking here...");
    const [h2size, seth2Size] = useState<number>(24);
    const [bottomText, setBottomText] = useState<string>("Edit banner bottom text content by easily clicking in this area here...");
    const [showEditBottomText, setShowEditBottomText] = useState<boolean>(false)
    const [showInput, setShowInput] = useState<boolean>(false)
    const [picResizePosition, setPicResizePosition] = useState({
        x: -16,
        y: -25
    })
    const [colourOption, setColourOption] = useState<Option>({
        colourName: 'black', label: '#000000'
    })

    const colourOptions: Option[] = [
        { colourName: 'bmw blue', label: '#0166B1' },
        { colourName: 'bmw white', label: '#FFFFFF' },
        { colourName: 'bmw grey', label: '#6F6F6F' },
        { colourName: 'black', label: '#000000' }
    ]

    const [showCars, setShowCars] = useState<boolean>(false);

    const [carOptions, setCarOption] = useState<CarOptions[]>([
        { carModel: 'X4', carPicSource: x4},
        { carModel: 'X1', carPicSource: x1 },
        { carModel: 'X3', carPicSource: x3 }
    ])

    const [selectedCar, setSelectedCar] = useState<CarOptions>(carOptions[2]);


    const handleH2Text = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();

        const typeInput = e.target.value;

        seth2Text(typeInput);
    };

    const handleShowInputEditor = () => {
        setShowInput(true)
    }

    const handleH2Size = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const inputSize = parseInt(e.target.value);

        seth2Size(inputSize)

    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {

        const DragStartPosition = JSON.stringify({ // vytvoříme stringifovaný objekt s pozic kam kliknul uživatel a pozicí kde se obrázek inicializoval, vše ve vlastnostech v objektu, ale je potřeba to stringify, abychom to mohli použít v setData
            startMouseClickX: e.clientX,
            startMouseClickY: e.clientY,
            InicializedPosition: picResizePosition
        })
        e.dataTransfer.setData('text/plain', DragStartPosition); // jako plain text to uložíme metodou setData do "krabičky"
    }

    const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }


    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        const dataFromDragStart = JSON.parse(e.dataTransfer.getData('text/plain')) // vyzvedneme si krabičku s data ze startu
        const actualPositionX = e.clientX - dataFromDragStart.startMouseClickX // spočítáme kolik pixelů je vzdálenost myši pointeru teď od kliknutí při startování dragu na ose X horizontalní
        const actualPositionY = e.clientY - dataFromDragStart.startMouseClickY // spočítáme kolik pixelů je vzdálenost naší myš pointeru teď od kliknutí při startování dragu na ose Y vertikální

        setPicResizePosition({
            x: dataFromDragStart.InicializedPosition.x + actualPositionX, // nastavíme stav pozice obrázku na ose x tak, že přičteme kde se obrázek inicializoval a přidáme k němu vzdálenost spočítanou mezi dvěma klikama, tím docílíme toho, že se dropně přesně kde by měl a nebude tam úskok, protože myší obrázek nikdy netáhneme přesně z prostředku. To samé aplikujeme na osu Y
            y: dataFromDragStart.InicializedPosition.y + actualPositionY


        });

        console.log('X: ' + picResizePosition.x, 'Y ' + picResizePosition.y)


    }

    const handleSelectColour = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const pickedColour = e.target.value;

        const foundColour = colourOptions.find((option) => pickedColour === option.colourName);

        if (foundColour) {
            setColourOption(foundColour);
        }

    }

    const handleExtLink = (buttonId: Number) => {

        let bmwurl = ""

        if (buttonId === 1) {
            bmwurl = "https://www.bmw.com";

        } else {
            bmwurl = "https://www.cartecgroup.eu/services/test-drive/";

        }



        window.open(bmwurl, "_blank", "noopener, noreferrer")
    }

    const handleShowEditBottomText = () => {
        setShowEditBottomText(true);
    }

    const handleEditBottomText = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const userEdit = e.target.value;

        setBottomText(userEdit)

    }

    const handleShowCars = () => {

        setShowCars(true)

    }

    const handleChangeCar = (carModel: string) => {

        const choosedCar = carOptions.find((car) => carModel === car.carModel)

        if (choosedCar) {
            setSelectedCar(choosedCar)
        }

        
        
    }

    



    return (
        <div className="main_container">
            <div className="banner-container" style={{ position: 'relative' }}>
                <div className="heading-section">
                    <div className="title-area">
                        <img className="logo" src={bmwlogo}></img>
                        <h2 style={{ fontSize: `${h2size}px`, color: `${colourOption.label}` }} onClick={handleShowInputEditor}>{h2text}</h2>
                    </div>
                    {showInput && (
                        <div className="input-area">
                            <input
                                type="text"
                                value={h2text}
                                onChange={handleH2Text}
                                placeholder="...">
                            </input>
                            <input
                                type="number"
                                min={16}
                                onChange={handleH2Size}
                                placeholder="size in px">
                            </input>
                            <select
                                value={colourOption.colourName}
                                onChange={handleSelectColour}>
                                {colourOptions.map((option) => (
                                    <option key={option.colourName} value={option.colourName}>
                                        {option.colourName}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => setShowInput(false)}>hide</button>
                        </div>
                    )}
                </div>

                <div className="drag-area">
                    <div
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragover}
                        onDrop={handleOnDrop}
                        style={{
                            position: 'absolute',
                            top: `${picResizePosition.y}px`, // zde velkolepé finále nastavujeme pozici na top a left přesně na pixely kam uživatel dropnul obrázek
                            left: `${picResizePosition.x}px`,

                        }}
                        className="pic-container">
                       
                        <img style={{transform: 'scale(0.6)'}} src={selectedCar.carPicSource}/>
                    </div>

                </div>
                <div>
                    <div className="bottom-text">
                        <p
                            onClick={handleShowEditBottomText}
                        >
                            {bottomText}
                        </p>
                    </div>

                    {showEditBottomText && (
                        <div className="bottom-text-editor">
                            <input
                                type="text"
                                value={bottomText}
                                onChange={handleEditBottomText}>
                            </input>
                            <button onClick={() => setShowEditBottomText(false)}>hide</button>
                        </div>
                    )}
                </div>
                <div className="car-select-container">
                <button onClick={handleShowCars}>change car</button>
                {showCars && (carOptions.map((car) => (
                    <div className="radio-buttons"key={car.carModel}>
                        <label>
                            <input
                                type="radio"
                                name="carSelect"
                                checked={car.carModel === selectedCar.carModel} // Tady říkáme: "Buď zaškrtnutý (true) pokud selectedCar.carModel se rovná car.carModel" 
                                value={car.carModel}
                                onClick={() => handleChangeCar(car.carModel)}
                            />
                            {car.carModel}
                        </label>
                    </div>
                )))}
                </div>

                <div className="button-container">
                    <button onClick={() => handleExtLink(1)}>Discover BMW</button>
                    <button onClick={() => handleExtLink(2)}>Test drive</button>
                </div>

            </div>
        </div>

    )
}