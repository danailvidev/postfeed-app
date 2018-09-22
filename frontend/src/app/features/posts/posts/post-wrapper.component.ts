import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pf-posts-wrapper',
    template: `
    <pf-post-create></pf-post-create>
    <pf-posts-list></pf-posts-list>
    `
})

export class PostsWrapperComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}