class Context  {
	constructor() {
		this._token = null;
		this._isEditorMode = true;
		this._preferences = {};
		this.subscribers = [];
	}

	get tokent() {
		return this._token;
	}

	get isEditorMode() {
		return this._isEditorMode;
	}

	get preferences() {
		return this._preferences;
	}

	set token(token) {
		this._token = token;
		for(const subscriber of this.subscribers) {
			subscriber.onContextChange(this.getContext());
		}
	}

	set isEditorMode(editorMode) {
		this._isEditorMode = editorMode;
		for(const subscriber of this.subscribers) {
			subscriber.onContextChange(this.getContext());
		}
	}

	set preferences(preferences) {
		this._preferences = preferences;
		for(const subscriber of this.subscribers) {
			subscriber.onContextChange(this.getContext());
		}
	}
	
	getContext(){
		return {
			token: this.token, 
			isEditorMode: this.isEditorMode,
			preferences: this.preferences
		};
	}

	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}
}


let context = new Context();

export default context;


