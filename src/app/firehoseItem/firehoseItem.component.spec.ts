import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FirehoseItemComponent } from "./firehoseItem.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FirehoseItemComponent", () => {

  let fixture: ComponentFixture<FirehoseItemComponent>;
  let component: FirehoseItemComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FirehoseItemComponent]
    });

    fixture = TestBed.createComponent(FirehoseItemComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
