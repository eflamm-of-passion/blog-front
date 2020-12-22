class Context  {
	constructor() {
		this.token = null;
		this.isEditorMode = true;
		this.preferences = {};
		this.subscribers = [];
	}

	set tokent(t) {
		this.isEditorMode = t;
		for(const subscriber of this.subscribers) {
			subscriber(this.getContext());
		}
	}

	set isEditorMode(t) {
		this.isEditorMode = t;
		for(const subscriber of this.subscribers) {
			subscriber(this.getContext());
		}
	}

	set preferences(t) {
		this.isEditorMode = t;
		for(const subscriber of this.subscribers) {
			subscriber(this.getContext());
		}
	}
	
	getContext(){
		return {
			token: this.token, 
			isEditorMode: this.isEditorMode,
			preferences: this.preferences
		};
	}

	subscribe(subscriberFunction) {
		this.subscribers.push(subscriberFunction);
	}
}


let context = new Context();

export default context;


