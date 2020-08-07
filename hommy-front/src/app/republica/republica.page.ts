import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;

  text = localStorage.getItem('text');
  username = localStorage.getItem('username');
  republica = JSON.parse(localStorage.getItem('republica'));
  republic_id = this.republica.id;

  textComment: string = '';
  comment_id: number;


  public comments = [];

  constructor( public formbuilder: FormBuilder,
    public commentService: CommentService, public searchService: SearchService ) { 
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {
    this.republica;
    this.getComments(this.republic_id);
    this.editMode; 
  }

  getComments($republica_id){
    this.searchService.getRepublicWithComments($republica_id).subscribe ( 
      (res) => {
      this.comments = res.comments;
    },(err) =>{ console.log(err); } 
    );
  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    //subscribe faz esperar acontecer as coisas no back
    form.value.republic_id = this.republic_id;
    form.value.username = this.username;
    this.editMode= false;
    this.commentService.createComment(form.value).subscribe(
      (res)=> {console.log(res);
        this.commentForm.reset();
        this.getComments(this.republic_id);
      }
    ,(err) =>{ console.log(err); } 
    );
  }

  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    
    this.editMode = false;
    this.commentService.updateComment(this.comment_id,form.value).subscribe(
      (res)=> {console.log(res);
        this.editCommentForm.reset();
        this.getComments(this.republic_id);
      }
      ,(err) =>{ console.log(err); } 
    );
    form.value.text = this.text;
  }

  toggleEdit(id){
    console.log(id)
    this.comment_id = id;
    for( let comment of this.comments ){  
      if (comment.id == id){
        this.textComment = comment.text;
        this.editMode = true;

      }
    }

  }

  deleteComment(form){
    console.log(form);
    this.commentService.deleteComment(form).subscribe(
      (res)=> {console.log(res);
        this.commentForm.reset();
        this.getComments(this.republic_id);
      }
      ,(err) =>{ console.log(err); } 
    );
  }

}
