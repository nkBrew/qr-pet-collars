from rest_framework import serializers

from ..models import Collar


class CollarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collar
        fields = (
            'img_url',
            'pet_name',
            'breed',
            'weight',
            'owner_name',
            'owner_email',
            'phone_number',
            'qr_code_id',
            'is_missing'
        )

    def validate_qr_code_id(self, value):
        err_msg = "you can't just _scan_ someone else's dog as your own..."
        already_used = Collar.objects.filter(qr_code_id=value).exists()

        if self.instance:
            if self.instance.qr_code_id != value and already_used:
                raise serializers.ValidationError(err_msg)
        else:
            if already_used:
                raise serializers.ValidationError(err_msg)

        return value
