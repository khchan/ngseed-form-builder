'use strict';

describe('E2E Testing for Form Builder Module', function() {

	browser.get('index.html');

	describe('Configuring textfield questions', function() {
		it('should be able to customize textfield options', function() {
			// clear questions
			element(by.css('p.text-center button[ng-click="reset()"')).click();
			// add and open field panel
			element(by.model('addField.new')).$('[value="0"]').click();
			element(by.css("div.add-field button")).click();
			element(by.css('a.accordion-toggle')).click();

			// edit label and name fields
			var label = element(by.model("field.field_title"));
			var name = element(by.model("field.field_name"));
			label.clear();
			label.sendKeys("Wowe such question, very ask");
			name.clear();
			name.sendKeys("unique_textfield_doge");
		});

		it('should be able to customize textfield validation', function() {
			// show validation options
			element(by.css('validation-directive div.col-md-8 button.btn-info')).click();
			var placeholder = element(by.model("field.field_placeholder"));
			var helpertext = element(by.model("field.field_helpertext"));
			placeholder.clear();
			placeholder.sendKeys("Much placehold");
			helpertext.clear();
			helpertext.sendKeys("Such help!")
			expect(placeholder.getAttribute("value")).toBe("Much placehold");
			expect(helpertext.getAttribute("value")).toBe("Such help!");
		});
	});

	describe('Rendering textfield questions and validation testing', function() {
		var rule, expression, input, ok;

		beforeEach(function() {
			rule = element(by.model('field.field_validation.rule'));
			expression = element(by.model('field.field_validation.expression'));
			input = element(by.css('field-directive input'));
			ok = element(by.css('field-directive span.glyphicon-ok'));
		});

		it('should render field correctly', function() {
			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			expect(element(by.css('field-directive label')).getText()).toBe("Wowe such question, very ask");
			expect(input.getAttribute("name")).toBe("unique_textfield_doge");
			expect(input.getAttribute("placeholder")).toBe("Much placehold");
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should render field correctly and enforce validation rules for "none"', function() {
			rule.$('[value="none"]').click();
			expect(expression.isEnabled()).toBe(false);

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			input.clear();
			expect(ok.isDisplayed()).toBe(false);
			input.sendKeys("doge");
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should enforce validation rules for "contains"', function() {
			rule.$('[value="contains"]').click();
			expect(expression.getAttribute("value")).toBe("");
			expect(expression.isEnabled()).toBe(true);
			expression.sendKeys("doge");
			expect(expression.getAttribute("value")).toBe("doge");

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			input.clear();
			input.sendKeys("wowe");
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys("doge");
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should enforce validation rules for "not_contains"', function() {
			rule.$('[value="not_contains"]').click();
			expect(expression.getAttribute("value")).toBe("");
			expect(expression.isEnabled()).toBe(true);
			expression.sendKeys("doge");
			expect(expression.getAttribute("value")).toBe("doge");

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			input.clear();
			input.sendKeys("doge");
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys("wowe");
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should enforce validation rules for "min_length"', function() {
			rule.$('[value="min_length"]').click();
			expect(expression.isEnabled()).toBe(true);
			expression.sendKeys(5);

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			input.clear();
			input.sendKeys("doge");
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys("doge, such pass");
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should enforce validation rules for "max_length"', function() {
			rule.$('[value="max_length"]').click();
			expect(expression.isEnabled()).toBe(true);
			expression.sendKeys(5);

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			input.clear();
			input.sendKeys("doge, such fail");
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys("wowe");
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});			
	});

	describe('Regular textfield validation testing', function() {
		beforeEach(function() {
			element(by.css('p.text-center button[ng-click="reset()"')).click();
		});

		it('should be able to customize email options', function() {
			element(by.model('addField.new')).$('[value="1"]').click();
			element(by.css("div.add-field button")).click();
			element(by.css('a.accordion-toggle')).click();

			// edit label and name fields
			var label = element(by.model("field.field_title"));
			var name = element(by.model("field.field_name"));
			label.clear();
			label.sendKeys("Wowe such email, much validate!");
			name.clear();
			name.sendKeys("unique_email_doge");

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			var input = element(by.css('field-directive input'));
			var ok = element(by.css('field-directive span.glyphicon-ok'));
			input.sendKeys('wowe');
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys('wowe@doge.com');
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

		it('should be able to customize password options', function() {
			element(by.model('addField.new')).$('[value="2"]').click();
			element(by.css("div.add-field button")).click();
			element(by.css('a.accordion-toggle')).click();

			// edit label and name fields
			var label = element(by.model("field.field_title"));
			var name = element(by.model("field.field_name"));
			label.clear();
			label.sendKeys("Wowe such password, much validate!");
			name.clear();
			name.sendKeys("unique_password_doge");

			element(by.css('p.text-center button[ng-click="previewOn()"]')).click();
			var input = element(by.css('field-directive input'));
			var ok = element(by.css('field-directive span.glyphicon-ok'));
			input.sendKeys('wowepassword');
			expect(ok.isDisplayed()).toBe(false);
			input.clear();
			input.sendKeys('WoweSuchPassword123');
			expect(ok.isDisplayed()).toBe(true);
			element(by.css('p.text-center button[ng-click="previewOff()"]')).click();
		});

	});
/*
	describe('Configuring radio button questions', function() {
		it('should be able to customize radio options', function() {
			element(by.css('p.text-center button[ng-click="reset()"')).click();
			element(by.model('addField.new')).$('[value="3"]').click();
			element(by.css("div.add-field button")).click();
		});

		it('should be able to add new radio options', function() {

		});

		it('should be able to remove radio options', function() {

		});
	});

	describe('Configuring dropdown questions', function() {
		it('should be able to customize dropdown options', function() {
			element(by.model('addField.new')).$('[value="4"]').click();
			element(by.css("div.add-field button")).click();
		});

		it('should be able to add new dropdown options', function() {

		});

		it('should be able to remove radio options', function() {

		});
	});

	describe('Configuring date questions', function() {
		it('should be able to customize date options', function() {
			element(by.model('addField.new')).$('[value="5"]').click();
			element(by.css("div.add-field button")).click();
		});
	});

	describe('Configuring textarea questions', function() {
		it('should be able to customize textarea options', function() {
			element(by.model('addField.new')).$('[value="6"]').click();
			element(by.css("div.add-field button")).click();
		});

		it('should be able to customize textarea validation', function() {

		});
	});

	describe('Configuring checkbox questions', function() {
		it('should be able to customize checkbox options', function() {
			element(by.model('addField.new')).$('[value="7"]').click();
			element(by.css("div.add-field button")).click();
		});
	});

	describe('Configuring checkbox-group questions', function() {
		it('should be able to customize checkbox-group options', function() {
			element(by.model('addField.new')).$('[value="8"]').click();
			element(by.css("div.add-field button")).click();
		});

		it('should be able add new checkbox-group options', function() {

		});

		it('should be able to remove checkbox-group options', function() {

		});
	});

	describe('Configuring number questions', function() {
		it('should be able to customize number options', function() {
			element(by.model('addField.new')).$('[value="9"]').click();
			element(by.css("div.add-field button")).click();
		});

		it('should be able to customize number validation', function() {

		});
	});

	describe('Configuring hidden questions', function() {
		it('should be able to customize hidden options', function() {
			element(by.model('addField.new')).$('[value="10"]').click();
			element(by.css("div.add-field button")).click();
		});
	});
*/
});
