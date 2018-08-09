import Vue from "vue";
import { Component } from "vue-property-decorator";

interface ITodoItem {
    description: string;
    done: boolean;
    id: string;
}

@Component
export default class TodoComponent extends Vue {
    todos: ITodoItem[];
    newItemDescription: string;

	mounted() {
        fetch("/api/todo")
            .then(response => response.json() as Promise<ITodoItem[]>)
            .then(data => {
                this.todos = data;
            });
    }

    data() {
        return {
            todos: [],
            newItemDescription: null
        };
    }

    addItem(event: Event) {
        if (event) event.preventDefault();

        fetch("/api/todo", {
                method: "post",
                body: JSON.stringify(<ITodoItem>{ description: this.newItemDescription }),
                headers: new Headers({
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                })
            })
            .then(response => response.json() as Promise<ITodoItem>)
            .then((newItem) => {
                this.todos.push(newItem);
                this.newItemDescription = String();
            });
    }

    completeItem(item: ITodoItem) {
        fetch("/api/todo/${item.id}", {
                method: "delete",
                headers: new Headers({
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                })
            })
            .then(() => {
                this.todos = this.todos.filter((t) => t.id !== item.id);
            });
    }
}