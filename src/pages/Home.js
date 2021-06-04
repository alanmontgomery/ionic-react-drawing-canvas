import { IonIcon, IonItem, IonLabel, IonInput, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, Platform } from '@ionic/react';
import { arrowUndoOutline, brushOutline, closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from './Home.module.css';

import CanvasDraw from 'react-canvas-draw';
import { SwatchesPicker } from 'react-color';

const Home = () => {

	var canvasRef = "";
	const [ brushColor, setBrushColor ] = useState("#000000");
	const [ brushSize, setBrushSize ] = useState(5);
	const [ showColorPicker, setShowColorPicker ] = useState(false);

	const handleColorChange = colorValue => {

		setBrushColor(colorValue.hex);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Ionic Drawing Canvas</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>

				<div className={ styles.canvasOptions }>
					<IonGrid className={ styles.fixed }>
						<IonRow>
							<IonCol size={ showColorPicker ? "12" : "2" }>

								<IonButton style={{ backgroundColor: brushColor }} color={ brushColor } expand="block" onClick={ () => setShowColorPicker(!showColorPicker) }>
									<IonIcon icon={ brushOutline } />
								</IonButton>

								{ showColorPicker && <SwatchesPicker onChange={ handleColorChange } className={ styles.picker } /> }
							</IonCol>

							{ !showColorPicker && 
								<>
									<IonCol size="4">
										<IonItem lines="none">
											<IonLabel position="inset">Size</IonLabel>
											<IonInput type="number" value={ brushSize } onIonChange={ e => setBrushSize(parseInt(e.target.value)) } />
										</IonItem>
									</IonCol>

									<IonCol size="3">
										<IonButton expand="full" color="primary" onClick={ () => canvasRef.undo() }>
											<IonIcon icon={ arrowUndoOutline } />
										</IonButton>
									</IonCol>

									<IonCol size="3">
										<IonButton expand="full" color="primary" onClick={ () => canvasRef.clear() }>
											<IonIcon icon={ closeOutline } />
										</IonButton>
									</IonCol>
								</>
							}
						</IonRow>
					</IonGrid>
				</div>
				<CanvasDraw brushRadius={ brushSize } lazyRadius={ 0 } canvasHeight={ window.innerHeight } canvasWidth={ window.innerWidth } brushColor={ brushColor } ref={ canvasDraw => (canvasRef = canvasDraw) } />
			</IonContent>
		</IonPage>
	);
};

export default Home;
