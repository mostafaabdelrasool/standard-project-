import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FirehoseListComponent } from "./firehoseList.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FirehoseListComponent", () => {

  let fixture: ComponentFixture<FirehoseListComponent>;
  let component: FirehoseListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FirehoseListComponent]
    });

    fixture = TestBed.createComponent(FirehoseListComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
